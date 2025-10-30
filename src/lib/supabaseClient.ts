import { createClient } from "@supabase/supabase-js";

// Read from Vite env vars. Define these in your .env.local:
// VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
const supabaseUrl = "https://etfnurcncnftwgvqpwpp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0Zm51cmNuY25mdHdndnFwd3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MjEyNDcsImV4cCI6MjA3NzM5NzI0N30.tQotgEV0S8GFEjBqCUAGCZS68B7G7BBbYwPOiBOnTEQ"

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast during development so missing env is obvious
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

export type LiveScoreRow = {
  id?: number;
  turf_id: number; // one row per turf
  team1_name: string;
  team2_name: string;
  runs: number | null;
  wickets: number | null;
  overs: number | null; // store as decimal (e.g., 4.2 means 4 overs 2 balls)
  Target?: number | null;
};

export const SCORE_TABLE_NAME = "Scores"; // table name in public schema


