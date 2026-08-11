/* =========================================================
   ZYPHOR'26 — register-script.js
   Registration + UPI payment proof flow
   ========================================================= */

import {
  getTeamByName,
  upsertRegistration,
  uploadPaymentScreenshot
} from "./supabase-client.js";

/* ----------------------------------------------------------
   Elements & State
---------------------------------------------------------- */
const form           = document.getElementById("registrationForm");
const regTeamName    = document.getElementById("regTeamName");
const regTeamStatus  = document.getElementById("regTeamStatus");
const regSubmitBtn   = document.getElementById("regSubmitBtn");
const regSubmitText  = document.getElementById("regSubmitText");
const regSpinner     = document.getElementById("regSpinner");
const regFormStatus  = document.getElementById("regFormStatus");
const paymentInput   = document.getElementById("paymentScreenshot");
const paymentPreviewWrap = document.getElementById("paymentPreviewWrap");
const paymentPreview = document.getElementById("paymentPreview");
const paymentDropzone = document.getElementById("paymentDropzone");
const paymentFileInfo = document.getElementById("paymentFileInfo");
const paymentFileName = document.getElementById("paymentFileName");
const paymentFileSize = document.getElementById("paymentFileSize");
const paymentRemoveBtn = document.getElementById("paymentRemoveBtn");
const paymentUploadTitle = document.getElementById("paymentUploadTitle");
const paymentUploadHint = document.getElementById("paymentUploadHint");

let resolvedTeam = null;
let currentMaxMembers = 3;
let countVeg = 3;
let countNonVeg = 0;
let paymentFile = null;

/* ----------------------------------------------------------
   Validation helpers
---------------------------------------------------------- */
function showErr(id, msg) {
  const el = document.querySelector(`[data-error="${id}"]`);
  const fi = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add("visible"); }
  if (fi) fi.closest(".reg-field")?.classList.add("has-error");
}
function clearErr(id) {
  const el = document.querySelector(`[data-error="${id}"]`);
  const fi = document.getElementById(id);
  if (el) { el.textContent = ""; el.classList.remove("visible"); }
  if (fi) fi.closest(".reg-field")?.classList.remove("has-error");
}
function clearAllErrors() {
  document.querySelectorAll(".reg-field-error").forEach(e => {
    e.textContent = "";
    e.classList.remove("visible");
  });
  document.querySelectorAll(".has-error").forEach(e => e.classList.remove("has-error"));
}

/* ----------------------------------------------------------
   Team Name Verification
---------------------------------------------------------- */
let teamLookupTimer = null;

regTeamName.addEventListener("input", () => {
  clearErr("regTeamName");
  resolvedTeam = null;
  regTeamStatus.textContent = "";
  regTeamStatus.className = "reg-team-status";
  clearTimeout(teamLookupTimer);
  updateSubmitAvailability();

  const val = regTeamName.value.trim();
  if (!val) return;

  regTeamStatus.textContent = "Verifying team…";
  regTeamStatus.className = "reg-team-status checking";

  teamLookupTimer = setTimeout(async () => {
    try {
      const { data, error } = await getTeamByName(val);

      if (error || !data) {
        regTeamStatus.textContent = "✗ Team not found — complete the Application first";
        regTeamStatus.className = "reg-team-status error";
        resolvedTeam = null;
      } else {
        resolvedTeam = data;
        regTeamStatus.textContent = `✓ Found: ${data.team_name} (${data.domain} Domain)`;
        regTeamStatus.className = "reg-team-status success";
        clearErr("regTeamName");

        // Sync team size from the Application page.
        if (data.num_members) {
          const radio = document.querySelector(
            `input[name="numMembers"][value="${data.num_members}"]`
          );
          if (radio) {
            radio.checked = true;
            updateMemberCountAndPricing(parseInt(data.num_members, 10));
          }
        }
      }
    } catch (e) {
      console.error("Team lookup error:", e);
      regTeamStatus.textContent = "Could not verify team name";
      regTeamStatus.className = "reg-team-status error";
      resolvedTeam = null;
    }
    updateSubmitAvailability();
  }, 600);
});

/* ----------------------------------------------------------
   Dynamic Members & Food Counter Controls
---------------------------------------------------------- */
const numMembersRadios = document.querySelectorAll('input[name="numMembers"]');
const totalMembersTarget = document.getElementById("totalMembersTarget");
const countVegDisplay    = document.getElementById("countVegDisplay");
const countNonVegDisplay = document.getElementById("countNonVegDisplay");
const currentSumDisplay  = document.getElementById("currentSumDisplay");
const maxMembersDisplay  = document.getElementById("maxMembersDisplay");
const calcMemberCount    = document.getElementById("calcMemberCount");
const calcTotalAmount    = document.getElementById("calcTotalAmount");

numMembersRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    updateMemberCountAndPricing(parseInt(radio.value, 10));
    updateSubmitAvailability();
  });
});

function updateMemberCountAndPricing(members) {
  currentMaxMembers = members;
  countVeg = members;
  countNonVeg = 0;

  totalMembersTarget.textContent = members;
  maxMembersDisplay.textContent = members;

  const totalFee = members * 250;
  calcMemberCount.textContent = members;
  calcTotalAmount.textContent = `₹${totalFee}`;

  renderFoodCounters();
  updateSubmitAvailability();
}

function renderFoodCounters() {
  countVegDisplay.textContent = countVeg;
  countNonVegDisplay.textContent = countNonVeg;
  currentSumDisplay.textContent = countVeg + countNonVeg;

  document.getElementById("btnVegMinus").disabled = countVeg <= 0;
  document.getElementById("btnVegPlus").disabled =
    countVeg + countNonVeg >= currentMaxMembers;
  document.getElementById("btnNonVegMinus").disabled = countNonVeg <= 0;
  document.getElementById("btnNonVegPlus").disabled =
    countVeg + countNonVeg >= currentMaxMembers;
}

document.getElementById("btnVegPlus").addEventListener("click", () => {
  if (countVeg + countNonVeg < currentMaxMembers) {
    countVeg++;
    if (countNonVeg > 0) countNonVeg--;
    renderFoodCounters();
    updateSubmitAvailability();
  }
});

document.getElementById("btnVegMinus").addEventListener("click", () => {
  if (countVeg > 0) {
    countVeg--;
    countNonVeg++;
    renderFoodCounters();
    updateSubmitAvailability();
  }
});

document.getElementById("btnNonVegPlus").addEventListener("click", () => {
  if (countVeg + countNonVeg < currentMaxMembers) {
    countNonVeg++;
    if (countVeg > 0) countVeg--;
    renderFoodCounters();
    updateSubmitAvailability();
  }
});

document.getElementById("btnNonVegMinus").addEventListener("click", () => {
  if (countNonVeg > 0) {
    countNonVeg--;
    countVeg++;
    renderFoodCounters();
    updateSubmitAvailability();
  }
});

/* ----------------------------------------------------------
   Payment Screenshot Upload — custom dropzone + preview
---------------------------------------------------------- */
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function resetPaymentUpload() {
  paymentInput.value = "";
  paymentFile = null;
  paymentPreview.src = "";
  paymentPreviewWrap.hidden = true;
  paymentFileInfo.hidden = true;
  paymentDropzone?.classList.remove("has-file", "is-dragover");
  if (paymentUploadTitle) paymentUploadTitle.textContent = "Drop screenshot here";
  if (paymentUploadHint) paymentUploadHint.textContent = "or click to browse from your device";
  updateSubmitAvailability();
}

function handlePaymentFile(file) {
  clearErr("paymentScreenshot");

  if (!file) {
    resetPaymentUpload();
    return;
  }

  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    resetPaymentUpload();
    showErr("paymentScreenshot", "Please upload a PNG, JPG, or WEBP image.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    resetPaymentUpload();
    showErr("paymentScreenshot", "Payment screenshot must be 5 MB or smaller.");
    return;
  }

  paymentFile = file;
  paymentInput.files = (() => {
    try {
      const dt = new DataTransfer();
      dt.items.add(file);
      return dt.files;
    } catch {
      return paymentInput.files;
    }
  })();

  paymentFileName.textContent = file.name;
  paymentFileSize.textContent = formatFileSize(file.size);
  paymentFileInfo.hidden = false;
  paymentDropzone?.classList.add("has-file");

  const reader = new FileReader();
  reader.onload = () => {
    paymentPreview.src = reader.result;
    paymentPreviewWrap.hidden = false;
  };
  reader.readAsDataURL(file);

  updateSubmitAvailability();
}

paymentInput.addEventListener("change", () => {
  handlePaymentFile(paymentInput.files?.[0] || null);
});

paymentDropzone?.addEventListener("click", (e) => {
  if (e.target !== paymentInput) paymentInput.click();
});

paymentDropzone?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    paymentInput.click();
  }
});

["dragenter", "dragover"].forEach(eventName => {
  paymentDropzone?.addEventListener(eventName, (e) => {
    e.preventDefault();
    paymentDropzone.classList.add("is-dragover");
  });
});

["dragleave", "drop"].forEach(eventName => {
  paymentDropzone?.addEventListener(eventName, (e) => {
    e.preventDefault();
    paymentDropzone.classList.remove("is-dragover");
  });
});

paymentDropzone?.addEventListener("drop", (e) => {
  const file = e.dataTransfer?.files?.[0];
  handlePaymentFile(file || null);
});

paymentRemoveBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  resetPaymentUpload();
});

/* ----------------------------------------------------------
   Enable final step only when every required field is complete
---------------------------------------------------------- */
const requiredFieldIds = [
  "regTeamName",
  "regStudentName",
  "regEmail",
  "regCollege",
  "regDept",
  "regYear",
  "regUpiId"
];

function isValidUpiId(value) {
  return /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}$/.test(value.trim());
}

function updateSubmitAvailability() {
  const valuesComplete = requiredFieldIds.every(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== "";
  });

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    document.getElementById("regEmail").value.trim()
  );
  const upiValid = isValidUpiId(document.getElementById("regUpiId").value);
  const membersSelected = !!document.querySelector('input[name="numMembers"]:checked');
  const foodBalanced = (countVeg + countNonVeg) === currentMaxMembers;
  const confirmed = document.getElementById("regConfirmCheck").checked;

  const ready =
    valuesComplete &&
    emailValid &&
    upiValid &&
    membersSelected &&
    foodBalanced &&
    !!resolvedTeam &&
    !!paymentFile &&
    confirmed;

  regSubmitBtn.disabled = !ready;
  regSubmitText.textContent = ready
    ? `Confirm Payment & Registration — ₹${currentMaxMembers * 250}`
    : "Complete Payment Details to Continue";
}

requiredFieldIds.forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    clearErr(id);
    updateSubmitAvailability();
  });
  document.getElementById(id).addEventListener("change", () => {
    clearErr(id);
    updateSubmitAvailability();
  });
});
document.getElementById("regConfirmCheck").addEventListener("change", updateSubmitAvailability);

/* ----------------------------------------------------------
   Form Submit — manual UPI payment proof
---------------------------------------------------------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAllErrors();
  regFormStatus.textContent = "";

  const teamNameVal = regTeamName.value.trim();
  const studentName = document.getElementById("regStudentName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const collegeName = document.getElementById("regCollege").value.trim();
  const department = document.getElementById("regDept").value.trim();
  const yearOfStudy = document.getElementById("regYear").value;
  const upiId = document.getElementById("regUpiId").value.trim();
  const confirmCheck = document.getElementById("regConfirmCheck");

  let ok = true;

  if (!teamNameVal) {
    showErr("regTeamName", "Please enter your team name.");
    ok = false;
  } else if (!resolvedTeam) {
    showErr("regTeamName", "Team not found. Please complete the Application first.");
    ok = false;
  }

  if (!studentName) { showErr("regStudentName", "Please enter your student name."); ok = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErr("regEmail", "Please enter a valid email address.");
    ok = false;
  }
  if (!collegeName) { showErr("regCollege", "Please enter your college name."); ok = false; }
  if (!department) { showErr("regDept", "Please enter your department."); ok = false; }
  if (!yearOfStudy) { showErr("regYear", "Please select your year of study."); ok = false; }
  if (!paymentFile) {
    showErr("paymentScreenshot", "Please upload your successful payment screenshot.");
    ok = false;
  }
  if (!isValidUpiId(upiId)) {
    showErr("regUpiId", "Please enter a valid UPI ID, for example name@upi.");
    ok = false;
  }
  if (countVeg + countNonVeg !== currentMaxMembers) {
    regFormStatus.textContent = "Veg + Non-Veg count must equal the total number of members.";
    ok = false;
  }
  if (!confirmCheck.checked) {
    showErr("regConfirmCheck", "Please confirm all details and the completed payment.");
    ok = false;
  }

  if (!ok) {
    regFormStatus.textContent ||= "Please complete all required fields and payment details.";
    document.querySelector(".has-error, .reg-field-error.visible")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    updateSubmitAvailability();
    return;
  }

  const totalAmount = currentMaxMembers * 250;
  const foodSummaryText = `${countVeg} Veg, ${countNonVeg} Non-Veg`;

  regSubmitBtn.disabled = true;
  regSubmitText.textContent = "Uploading Payment Proof…";
  regSpinner.style.display = "inline-block";

  try {
    const paymentScreenshotUrl = await uploadPaymentScreenshot(paymentFile, teamNameVal);

    regSubmitText.textContent = "Saving Registration…";

    const { error: regErr } = await upsertRegistration({
      teamId: resolvedTeam.id,
      teamName: teamNameVal,
      studentName,
      email,
      collegeName,
      department,
      yearOfStudy,
      foodPref: foodSummaryText,
      vegCount: countVeg,
      nonVegCount: countNonVeg,
      totalAmount,
      upiId,
      paymentScreenshotUrl,
      paymentId: "",
      paymentStatus: "Payment Proof Submitted"
    });

    if (regErr) throw regErr;

    document.getElementById("regSuccessTeam").textContent = teamNameVal;
    document.getElementById("regMain").hidden = true;
    document.getElementById("regSuccessOverlay").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (err) {
    console.error("Registration save error:", err);
    regFormStatus.textContent =
      "Save failed: " + (err.message || "Please check your connection and try again.");
    regSubmitBtn.disabled = false;
    regSubmitText.textContent = `Confirm Payment & Registration — ₹${totalAmount}`;
  } finally {
    regSpinner.style.display = "none";
    updateSubmitAvailability();
  }
});

/* Initial render */
updateMemberCountAndPricing(3);
updateSubmitAvailability();

/* Sticky Header */
const siteHeader = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
