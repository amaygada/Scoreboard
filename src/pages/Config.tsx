import React, { useEffect, useMemo, useState } from "react";
import { supabase, SCORE_TABLE_NAME, type LiveScoreRow } from "../lib/supabaseClient";
import { Button } from "../components/Button";

export default function Config() {
  const [form, setForm] = useState<LiveScoreRow>({
    id: 1,
    team1_name: "",
    team2_name: "",
    runs: null,
    wickets: null,
    overs: null,
    Target: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [lastAction, setLastAction] = useState<string>("");

  const isReady = useMemo(() => Boolean(supabase), []);

  function updateField<K extends keyof LiveScoreRow>(key: K, value: LiveScoreRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Helper to convert overs decimal to overs.balls format for display
  // overs stored as decimal: 4.2 means 4 overs 2 balls (balls are 0-5)
  function formatOvers(overs: number | null): string {
    if (overs === null) return "0.0";
    const fullOvers = Math.floor(overs);
    const ballsDecimal = overs - fullOvers;
    // Convert decimal to balls (0.0-0.5 maps to 0-5 balls)
    const balls = Math.round(ballsDecimal * 10);
    // Ensure balls don't exceed 5
    const validBalls = Math.min(balls, 5);
    return `${fullOvers}.${validBalls}`;
  }

  // Helper to convert overs.balls format to decimal
  // Input: "4.2" -> Output: 4.2 (4 overs, 2 balls)
  function parseOvers(oversStr: string): number {
    if (!oversStr || oversStr.trim() === "") return 0;
    const parts = oversStr.split(".");
    if (parts.length === 2) {
      const overs = parseInt(parts[0]) || 0;
      let balls = parseInt(parts[1]) || 0;
      // Ensure balls are between 0-5
      balls = Math.min(Math.max(balls, 0), 5);
      return overs + balls / 10;
    }
    // If no decimal, treat as whole overs
    const wholeOvers = parseInt(oversStr) || 0;
    return wholeOvers;
  }

  // Add runs quickly
  function addRuns(amount: number) {
    setForm((prev) => ({
      ...prev,
      runs: (prev.runs ?? 0) + amount,
    }));
    setLastAction(`+${amount} run${amount > 1 ? "s" : ""}`);
    setTimeout(() => setLastAction(""), 2000);
  }

  // Add wickets
  function addWicket() {
    setForm((prev) => ({
      ...prev,
      wickets: Math.min((prev.wickets ?? 0) + 1, 10),
    }));
    setLastAction("+1 wicket");
    setTimeout(() => setLastAction(""), 2000);
  }

  // Remove wickets
  function removeWicket() {
    setForm((prev) => ({
      ...prev,
      wickets: Math.max((prev.wickets ?? 0) - 1, 0),
    }));
    setLastAction("-1 wicket");
    setTimeout(() => setLastAction(""), 2000);
  }

  // Add balls to overs (smart: 6 balls = 1 over)
  function addBalls(ballsToAdd: number) {
    setForm((prev) => {
      const currentOvers = prev.overs ?? 0;
      const fullOvers = Math.floor(currentOvers);
      const currentBalls = Math.round((currentOvers - fullOvers) * 10);
      
      let newBalls = currentBalls + ballsToAdd;
      let newFullOvers = fullOvers;
      
      // Convert excess balls to overs
      if (newBalls >= 6) {
        newFullOvers += Math.floor(newBalls / 6);
        newBalls = newBalls % 6;
      }
      
      const newOvers = newFullOvers + newBalls / 10;
      return {
        ...prev,
        overs: newOvers,
      };
    });
    setLastAction(`+${ballsToAdd} ball${ballsToAdd > 1 ? "s" : ""}`);
    setTimeout(() => setLastAction(""), 2000);
  }

  // Remove balls from overs (smart: handles borrowing from overs)
  function removeBalls(ballsToRemove: number) {
    setForm((prev) => {
      const currentOvers = prev.overs ?? 0;
      if (currentOvers <= 0) return prev; // Don't go below 0
      
      const fullOvers = Math.floor(currentOvers);
      const currentBalls = Math.round((currentOvers - fullOvers) * 10);
      
      let newBalls = currentBalls - ballsToRemove;
      let newFullOvers = fullOvers;
      
      // Handle borrowing from overs if needed
      while (newBalls < 0 && newFullOvers > 0) {
        newFullOvers -= 1;
        newBalls += 6;
      }
      
      // Ensure we don't go below 0
      if (newFullOvers < 0 || (newFullOvers === 0 && newBalls < 0)) {
        newFullOvers = 0;
        newBalls = 0;
      }
      
      const newOvers = newFullOvers + newBalls / 10;
      return {
        ...prev,
        overs: newOvers,
      };
    });
    setLastAction(`-${ballsToRemove} ball${ballsToRemove > 1 ? "s" : ""}`);
    setTimeout(() => setLastAction(""), 2000);
  }

  // Quick save - saves without showing loading state
  async function quickSave() {
    if (loading) return;
    setLoading(true);
    try {
      const payload: LiveScoreRow = { ...form };
      const { data: updated, error: updateError } = await supabase
        .from(SCORE_TABLE_NAME)
        .update(payload)
        .eq("id", payload.id)
        .select()
        .maybeSingle();
      
      if (updateError) throw updateError;

      if (updated) {
        setMessage("Saved ✓");
      } else {
        const { error: insertError } = await supabase
          .from(SCORE_TABLE_NAME)
          .insert(payload)
          .select()
          .single();
        if (insertError) throw insertError;
        setMessage("Saved ✓");
      }
      
      // Auto-clear message after 1.5s
      setTimeout(() => setMessage(""), 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessage(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  // Auto-save after quick actions (debounced)
  useEffect(() => {
    if (!lastAction) return;
    const timer = setTimeout(() => {
      quickSave();
    }, 800); // Debounce: save 800ms after last action
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAction]);

  async function handleUpsert() {
    setLoading(true);
    setMessage("");
    try {
      const payload: LiveScoreRow = { ...form };

      // First try to update existing row by primary key id
      const { data: updated, error: updateError } = await supabase
        .from(SCORE_TABLE_NAME)
        .update(payload)
        .eq("id", payload.id)
        .select()
        .maybeSingle();
      if (updateError) throw updateError;

      if (updated) {
        setMessage("Saved");
      } else {
        // If no row existed, insert a new one
        const { error: insertError } = await supabase
          .from(SCORE_TABLE_NAME)
          .insert(payload)
          .select()
          .single();
        if (insertError) throw insertError;
        setMessage("Saved");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessage(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  // Prefill form when id changes by fetching existing row
  useEffect(() => {
    let cancelled = false;
    async function fetchExisting() {
      setMessage("");
      const { data } = await supabase
        .from(SCORE_TABLE_NAME)
        .select("*")
        .eq("id", form.id)
        .maybeSingle();

      if (!cancelled && data) {
        setForm((prev) => ({ ...prev, ...data }));
      }
    }
    fetchExisting();
    return () => {
      cancelled = true;
    };
  }, [form.id]);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 pb-8">
      <h1 className="text-xl sm:text-2xl font-semibold">Live Score Config</h1>
      <p className="mt-1 text-sm sm:text-base text-slate-600">Enter current match details and live scores</p>

      {!isReady && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800 text-sm">
          Missing Supabase env vars. Define <span className="font-mono">VITE_SUPABASE_URL</span> and <span className="font-mono">VITE_SUPABASE_ANON_KEY</span>.
        </div>
      )}

      {/* Status message */}
      {(message || lastAction) && (
        <div className={`mt-3 px-4 py-2 rounded-md text-sm font-medium ${
          message.includes("Error") 
            ? "bg-red-50 text-red-700 border border-red-200" 
            : "bg-green-50 text-green-700 border border-green-200"
        }`}>
          {message || lastAction}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6">
        {/* Turf ID Selector */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Turf ID</span>
            <select
              value={form.id}
              onChange={(e) => updateField("id", Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
        </div>

        {/* Quick Actions Section - Runs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Quick Actions</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 flex-1">Runs: <span className="text-lg font-bold text-primary">{form.runs ?? 0}</span></span>
              <input
                type="number"
                value={form.runs ?? ""}
                onChange={(e) => updateField("runs", e.target.value === "" ? null : Number(e.target.value))}
                className="w-24 rounded-md border border-slate-300 px-2 py-2 text-center text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                min={0}
                placeholder="0"
              />
              <Button
                onClick={quickSave}
                variant="success"
                size="md"
                disabled={loading}
                className="min-w-[80px]"
              >
                Save
              </Button>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              <Button
                onClick={() => addRuns(1)}
                variant="primary"
                size="lg"
                className="text-lg font-bold py-4 min-h-[56px]"
              >
                +1
              </Button>
              <Button
                onClick={() => addRuns(2)}
                variant="primary"
                size="lg"
                className="text-lg font-bold py-4 min-h-[56px]"
              >
                +2
              </Button>
              <Button
                onClick={() => addRuns(3)}
                variant="primary"
                size="lg"
                className="text-lg font-bold py-4 min-h-[56px]"
              >
                +3
              </Button>
              <Button
                onClick={() => addRuns(4)}
                variant="primary"
                size="lg"
                className="text-lg font-bold py-4 min-h-[56px]"
              >
                +4
              </Button>
              <Button
                onClick={() => addRuns(6)}
                variant="primary"
                size="lg"
                className="text-lg font-bold py-4 min-h-[56px]"
              >
                +6
              </Button>
            </div>
          </div>

          {/* Quick Actions - Wickets */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 flex-1">Wickets: <span className="text-lg font-bold text-alert">{form.wickets ?? 0}</span> / 10</span>
              <input
                type="number"
                value={form.wickets ?? ""}
                onChange={(e) => updateField("wickets", e.target.value === "" ? null : Number(e.target.value))}
                className="w-24 rounded-md border border-slate-300 px-2 py-2 text-center text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                min={0}
                max={10}
                placeholder="0"
              />
              <Button
                onClick={quickSave}
                variant="success"
                size="md"
                disabled={loading}
                className="min-w-[80px]"
              >
                Save
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={addWicket}
                variant="danger"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +1 Wicket
              </Button>
              <Button
                onClick={removeWicket}
                variant="dangerlite"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                -1 Wicket
              </Button>
            </div>
          </div>

          {/* Quick Actions - Overs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 flex-1">Overs: <span className="text-lg font-bold text-primary">{formatOvers(form.overs)}</span></span>
              <input
                type="text"
                value={formatOvers(form.overs)}
                onChange={(e) => updateField("overs", e.target.value === "" ? null : parseOvers(e.target.value))}
                className="w-24 rounded-md border border-slate-300 px-2 py-2 text-center text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="0.0"
                pattern="[0-9]+\\.[0-5]"
              />
              <Button
                onClick={quickSave}
                variant="success"
                size="md"
                disabled={loading}
                className="min-w-[80px]"
              >
                Save
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => addBalls(1)}
                variant="secondary"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +1 Ball
              </Button>
              <Button
                onClick={() => addBalls(2)}
                variant="secondary"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +2 Balls
              </Button>
              <Button
                onClick={() => addBalls(6)}
                variant="primarylite"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +1 Over
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => addBalls(3)}
                variant="secondary"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +3 Balls
              </Button>
              <Button
                onClick={() => addBalls(4)}
                variant="secondary"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +4 Balls
              </Button>
              <Button
                onClick={() => addBalls(5)}
                variant="secondary"
                size="lg"
                className="text-base font-semibold py-4 min-h-[56px]"
              >
                +5 Balls
              </Button>
            </div>

            {/* Subtract Balls Section */}
            <div className="pt-2 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Button
                  onClick={() => removeBalls(1)}
                  variant="dangerlite"
                  size="lg"
                  className="text-base font-semibold py-4 min-h-[56px]"
                >
                  -1 Ball
                </Button>
                <Button
                  onClick={() => removeBalls(2)}
                  variant="dangerlite"
                  size="lg"
                  className="text-base font-semibold py-4 min-h-[56px]"
                >
                  -2 Balls
                </Button>
                <Button
                  onClick={() => removeBalls(6)}
                  variant="danger"
                  size="lg"
                  className="text-base font-semibold py-4 min-h-[56px]"
                >
                  -1 Over
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => removeBalls(3)}
                  variant="dangerlite"
                  size="lg"
                  className="text-base font-semibold py-4 min-h-[56px]"
                >
                  -3 Balls
                </Button>
                <Button
                  onClick={() => removeBalls(4)}
                  variant="dangerlite"
                  size="lg"
                  className="text-base font-semibold py-4 min-h-[56px]"
                >
                  -4 Balls
                </Button>
                <Button
                  onClick={() => removeBalls(5)}
                  variant="dangerlite"
                  size="lg"
                  className="text-base font-semibold py-4 min-h-[56px]"
                >
                  -5 Balls
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


