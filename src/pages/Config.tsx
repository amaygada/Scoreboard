import React, { useEffect, useMemo, useState } from "react";
import { supabase, SCORE_TABLE_NAME, type LiveScoreRow } from "../lib/supabaseClient";
import { Button } from "../components/Button";

export default function Config() {
  const [form, setForm] = useState<LiveScoreRow>({
    turf_id: 1,
    team1_name: "",
    team2_name: "",
    runs: null,
    wickets: null,
    overs: null,
    Target: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const isReady = useMemo(() => Boolean(supabase), []);

  function updateField<K extends keyof LiveScoreRow>(key: K, value: LiveScoreRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleUpsert() {
    setLoading(true);
    setMessage("");
    try {
      const payload: LiveScoreRow = { ...form };

      // Ensure only one row per turf by upserting on turf_id
      const { data, error } = await supabase
        .from(SCORE_TABLE_NAME)
        .upsert(payload, { onConflict: "turf_id" })
        .select()
        .single();
      if (error) throw error;
      setMessage("Saved");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessage(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  // Prefill form when turf_id changes by fetching existing row
  useEffect(() => {
    let cancelled = false;
    async function fetchExisting() {
      setMessage("");
      const { data } = await supabase
        .from(SCORE_TABLE_NAME)
        .select("*")
        .eq("turf_id", form.turf_id)
        .maybeSingle();

      if (!cancelled && data) {
        setForm((prev) => ({ ...prev, ...data }));
      }
    }
    fetchExisting();
    return () => {
      cancelled = true;
    };
  }, [form.turf_id]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Live Score Config</h1>
      <p className="mt-1 text-slate-600">Enter current match details and live score. This writes to Supabase table <span className="font-mono">{SCORE_TABLE_NAME}</span>.</p>

      {!isReady && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
          Missing Supabase env vars. Define <span className="font-mono">VITE_SUPABASE_URL</span> and <span className="font-mono">VITE_SUPABASE_ANON_KEY</span>.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4">
        <label className="block">
          <span className="text-sm text-slate-600">Turf ID</span>
          <select
            value={form.turf_id}
            onChange={(e) => updateField("turf_id", Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none bg-white"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-600">Team 1 Name</span>
            <input
              type="text"
              value={form.team1_name}
              onChange={(e) => updateField("team1_name", e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="Team 1"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-600">Team 2 Name</span>
            <input
              type="text"
              value={form.team2_name}
              onChange={(e) => updateField("team2_name", e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="Team 2"
            />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm text-slate-600">Runs</span>
            <input
              type="number"
              value={form.runs ?? ""}
              onChange={(e) => updateField("runs", e.target.value === "" ? null : Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none"
              min={0}
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-600">Wickets</span>
            <input
              type="number"
              value={form.wickets ?? ""}
              onChange={(e) => updateField("wickets", e.target.value === "" ? null : Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none"
              min={0}
              max={10}
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-600">Overs (e.g., 4.2)</span>
            <input
              type="number"
              step="0.1"
              value={form.overs ?? ""}
              onChange={(e) => updateField("overs", e.target.value === "" ? null : Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none"
              min={0}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-slate-600">Target (optional)</span>
          <input
            type="number"
            value={form.Target ?? ""}
            onChange={(e) => updateField("Target", e.target.value === "" ? null : Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="e.g., 160"
            min={0}
          />
        </label>

        <div className="mt-2">
          <Button onClick={handleUpsert} disabled={loading} isLoading={loading}>
            Save
          </Button>
        </div>

        {message && (
          <div className="text-sm mt-2 text-slate-700">{message}</div>
        )}
      </div>
    </div>
  );
}


