import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Scoreboard2 } from "../components/Scoreboard";
import { supabase, SCORE_TABLE_NAME, type LiveScoreRow } from "../lib/supabaseClient";
import tournamentLogo from "../assets/images/Tournament_name.jpeg";
import titleSponsor from "../assets/images/title_sponsor.jpeg";
import eventManager from "../assets/images/T_event_managed_by.jpeg";

export default function Scoreboard2Page() {
  const { turfId } = useParams<{ turfId: string }>();
  const [row, setRow] = useState<LiveScoreRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    let intervalId: number | undefined;

    async function fetchRowOnce() {
      const id = Number(turfId);
      if (!Number.isFinite(id)) {
        if (!cancelled) setError("Invalid turf id");
        return;
      }
      const { data, error: err } = await supabase
        .from(SCORE_TABLE_NAME)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!cancelled) {
        if (err) {
          setError(err.message);
        } else {
          setError("");
          setRow(data ?? null);
        }
      }
    }

    async function start() {
      setLoading(true);
      await fetchRowOnce(); // initial load
      if (!cancelled) setLoading(false);
      intervalId = window.setInterval(fetchRowOnce, 2000);
    }

    start();
    return () => {
      cancelled = true;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [turfId]);

  if (loading) {
    return <div className="p-6">Loading…</div>;
  }
  if (error) {
    return <div className="p-6 text-red-700">{error}</div>;
  }
  if (!row) {
    return <div className="p-6">No score found for turf {turfId}</div>;
  }

  const matchTitle = `${row.team1_name} v/s ${row.team2_name}`;
  const runs = Number(row.runs) || 0;
  const wickets = Number(row.wickets) || 0;
  const overs = String(row.overs ?? "0");
  const target = typeof row.Target === "number" ? row.Target : 0;

  return (
    <Scoreboard2
      matchTitle={matchTitle}
      score={{ runs, wickets }}
      overs={overs}
      target={target}
      tournamentLogoSrc={tournamentLogo}
      titleSponsorLogoSrc={titleSponsor}
      eventManagerLogoSrc={eventManager}
    />
  );
}

