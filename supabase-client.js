/* =========================================================
   ZYPHOR'26 — supabase-client.js
   Shared Supabase client + CRUD helpers
   ========================================================= */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL  = "https://qcgobbldrystrplllckj.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZ29iYmxkcnlzdHJwbGxsY2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMzM4MzMsImV4cCI6MjEwMTkwOTgzM30.23oNCrGiPrUztp_qsrkABrzJ3JgAFoN73VJsvZQmSAA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

/* -------------------------------------------------------
   TEAMS
------------------------------------------------------- */
export async function upsertTeam({ teamName, domain, teamLeader, numMembers, memberNames, selectedStatement = null }) {
  return supabase.from("teams").upsert(
    {
      team_name: teamName,
      domain,
      team_leader: teamLeader,
      num_members: numMembers,
      member_names: memberNames,
      selected_statement: selectedStatement
    },
    { onConflict: "team_name" }
  ).select().single();
}

export async function getTeamByName(teamName) {
  const norm = (teamName || "").trim();
  if (!norm) return { data: null, error: null };
  return supabase.from("teams").select("*").ilike("team_name", norm).maybeSingle();
}

export async function saveTeamStatement(teamId, statementObj) {
  return supabase.from("teams").update({
    selected_statement: JSON.stringify(statementObj)
  }).eq("id", teamId).select().single();
}

/* -------------------------------------------------------
   DOMAIN ANSWERS (legacy support)
------------------------------------------------------- */
export async function upsertDomainAnswers(teamId, answers) {
  await supabase.from("domain_answers").delete().eq("team_id", teamId);
  if (!answers || answers.length === 0) return { data: [], error: null };
  return supabase.from("domain_answers").insert(answers.map(({ question, answer }) => ({ team_id: teamId, question, answer }))).select();
}

export async function getDomainAnswers(teamId) {
  return supabase.from("domain_answers").select("*").eq("team_id", teamId).order("id");
}

/* -------------------------------------------------------
   REGISTRATIONS
------------------------------------------------------- */
export async function upsertRegistration({
  teamId, teamName, studentName, email, collegeName, department,
  yearOfStudy, foodPref, vegCount = 0, nonVegCount = 0, totalAmount = 0,
  upiId = "", paymentScreenshotUrl = "", paymentId = "", paymentStatus = "Payment Proof Submitted"
}) {
  return supabase.from("registrations").upsert(
    {
      team_id: teamId,
      team_name: teamName,
      student_name: studentName,
      email,
      college_name: collegeName,
      department,
      year_of_study: yearOfStudy,
      food_pref: foodPref,
      veg_count: vegCount,
      non_veg_count: nonVegCount,
      total_amount: totalAmount,
      upi_id: upiId,
      payment_id: paymentId,
      payment_screenshot_url: paymentScreenshotUrl || "",
      payment_status: paymentStatus
    },
    { onConflict: "team_name" }
  ).select().single();
}

export async function uploadPaymentScreenshot(file, teamName) {
  try {
    const ext  = file.name.split(".").pop() || "jpg";
    const path = `${normalizeKey(teamName)}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("payment-screenshots").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("payment-screenshots").getPublicUrl(path);
      return data.publicUrl;
    }
    console.warn("Storage upload notice:", error.message || error);
  } catch (e) {
    console.warn("Storage upload exception, falling back to Data URL:", e);
  }

  // Fallback: Convert image file to base64 Data URL if bucket does not exist or upload fails
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/* -------------------------------------------------------
   ADMIN / HOST DATA
------------------------------------------------------- */
export async function getAllTeamsFull() {
  const { data, error } = await supabase.from("teams").select("*, domain_answers(*), registrations(*)").order("created_at", { ascending: false });
  if (error) {
    console.warn("getAllTeamsFull error:", error);
    return [];
  }
  return data || [];
}

export async function deleteTeam(teamId) {
  return supabase.from("teams").delete().eq("id", teamId);
}

export function normalizeKey(name) {
  return (name || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
