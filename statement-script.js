/* =========================================================
   ZYPHOR'26 — statement-script.js
   Statement unlock countdown, Team lookup & Statement selection
   ========================================================= */

import { DOMAIN_STATEMENTS, HACKATHON_NOTE } from "./statements-data.js";
import { getTeamByName, saveTeamStatement } from "./supabase-client.js";

// Target Release Date: 27-08-2026 09:00:00 AM IST
const UNLOCK_DATE = new Date("2026-08-27T09:00:00+05:30").getTime();

let selectedTeamData = null;
let selectedStatementObj = null;

/* ----------------------------------------------------------
   Countdown & Unlock Check
---------------------------------------------------------- */
const stmtLockCard     = document.getElementById("stmtLockCard");
const stmtUnlockedCard = document.getElementById("stmtUnlockedCard");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = UNLOCK_DATE - now;

  if (diff <= 0) {
    // Unlocked automatically!
    unlockStatementsPage();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("cdDays").textContent  = String(days).padStart(2, "0");
  document.getElementById("cdHours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cdMins").textContent  = String(mins).padStart(2, "0");
  document.getElementById("cdSecs").textContent  = String(secs).padStart(2, "0");
}

let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

function unlockStatementsPage() {
  stmtLockCard.hidden = true;
  stmtUnlockedCard.hidden = false;
}

/* ----------------------------------------------------------
   Team Lookup Form
---------------------------------------------------------- */
const teamLookupForm   = document.getElementById("teamLookupForm");
const stmtTeamNameInput = document.getElementById("stmtTeamNameInput");
const btnStmtLookup    = document.getElementById("btnStmtLookup");
const stmtLookupStatus = document.getElementById("stmtLookupStatus");
const stmtListSection  = document.getElementById("stmtListSection");

teamLookupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  stmtLookupStatus.textContent = "";
  stmtLookupStatus.className = "stmt-lookup-status";

  const nameVal = stmtTeamNameInput.value.trim();
  if (!nameVal) {
    stmtLookupStatus.textContent = "Please enter your team name.";
    stmtLookupStatus.classList.add("error");
    return;
  }

  btnStmtLookup.disabled = true;
  stmtLookupStatus.textContent = "Searching team database…";

  try {
    const { data, error } = await getTeamByName(nameVal);
    btnStmtLookup.disabled = false;

    if (error || !data) {
      stmtLookupStatus.textContent = "✗ Team not found. Please register your team in the Application page first.";
      stmtLookupStatus.classList.add("error");
      return;
    }

    selectedTeamData = data;
    stmtLookupStatus.textContent = `✓ Found Team "${data.team_name}" (${data.domain} Domain)`;
    stmtLookupStatus.classList.add("success");

    // Check if team already selected a statement
    if (data.selected_statement) {
      try {
        const parsed = JSON.parse(data.selected_statement);
        showConfirmedPanel(parsed);
        return;
      } catch(e) {}
    }

    renderStatementsForDomain(data.domain);

    document.getElementById("displayTeamName").textContent   = data.team_name;
    document.getElementById("displayTeamDomain").textContent = data.domain + " Domain";

    stmtListSection.hidden = false;
    stmtListSection.scrollIntoView({ behavior: "smooth" });

  } catch (err) {
    btnStmtLookup.disabled = false;
    stmtLookupStatus.textContent = "Lookup failed: " + (err.message || "Unknown error");
    stmtLookupStatus.classList.add("error");
  }
});

/* ----------------------------------------------------------
   Render Statements
---------------------------------------------------------- */
const stmtCardsGrid = document.getElementById("stmtCardsGrid");

function renderStatementsForDomain(domain) {
  const statements = DOMAIN_STATEMENTS[domain] || DOMAIN_STATEMENTS.AI;
  stmtCardsGrid.innerHTML = "";
  const noteEl = document.getElementById("stmtHackathonNote");
  if (noteEl) {
    if (domain === "IoT") {
      noteEl.hidden = false;
      noteEl.innerHTML = `<strong>Hackathon Note:</strong> ${escapeHtml(HACKATHON_NOTE)}`;
    } else {
      noteEl.hidden = true;
      noteEl.textContent = "";
    }
  }

  statements.forEach((item, index) => {
    const label = document.createElement("label");
    label.className = "stmt-card";
    label.setAttribute("for", `stmt_${item.id}`);

    label.innerHTML = `
      <input type="radio" name="selectedStatementId" id="stmt_${item.id}" value="${item.id}" class="stmt-card-radio" ${index === 0 ? "checked" : ""}>
      <div class="stmt-card-inner">
        <div class="stmt-card-code">${item.id}</div>
        <div class="stmt-card-body">
          <h3 class="stmt-card-title">${escapeHtml(item.title)}</h3>
          <p class="stmt-card-desc">${escapeHtml(item.description)}</p>
          <div class="stmt-card-meta">
            <span class="stmt-tag">${escapeHtml(item.category)}</span>
            <span class="stmt-tag">${escapeHtml(item.level)}</span>
          </div>
        </div>
        <div class="stmt-card-radio-mark"></div>
      </div>
    `;

    stmtCardsGrid.appendChild(label);
  });
}

/* ----------------------------------------------------------
   Submit Selected Statement
---------------------------------------------------------- */
const statementSelectForm = document.getElementById("statementSelectForm");
const btnConfirmStatement = document.getElementById("btnConfirmStatement");
const btnConfirmText      = document.getElementById("btnConfirmText");

statementSelectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!selectedTeamData) return;

  const checkedRadio = document.querySelector('input[name="selectedStatementId"]:checked');
  if (!checkedRadio) {
    alert("Please select a problem statement.");
    return;
  }

  const stmtId = checkedRadio.value;
  const domain = selectedTeamData.domain || "AI";
  const statementsList = DOMAIN_STATEMENTS[domain] || DOMAIN_STATEMENTS.AI;
  const matchObj = statementsList.find(s => s.id === stmtId);

  if (!matchObj) return;

  btnConfirmStatement.disabled = true;
  btnConfirmText.textContent = "Saving Selection…";

  try {
    const { error } = await saveTeamStatement(selectedTeamData.id, matchObj);
    if (error) throw error;

    showConfirmedPanel(matchObj);

  } catch (err) {
    alert("Save failed: " + err.message);
    btnConfirmStatement.disabled = false;
    btnConfirmText.textContent = "Confirm & Lock Selected Statement";
  }
});

function showConfirmedPanel(stmtObj) {
  document.getElementById("stmtLookupSection").hidden = true;
  document.getElementById("stmtListSection").hidden   = true;

  document.getElementById("confirmedTeamDisplay").textContent = selectedTeamData ? selectedTeamData.team_name : "";
  document.getElementById("confCode").textContent  = stmtObj.id;
  document.getElementById("confTitle").textContent = stmtObj.title;
  document.getElementById("confDesc").textContent  = stmtObj.description;

  document.getElementById("stmtSuccessBox").hidden = false;
  document.getElementById("stmtSuccessBox").scrollIntoView({ behavior: "smooth" });
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
}
