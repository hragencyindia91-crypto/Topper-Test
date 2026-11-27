
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function VisitorsPage() {
  const [total, setTotal] = useState(0);
  const [unique, setUnique] = useState(0);
  const [today, setToday] = useState(0);
  const [month, setMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVisitors() {
      const { data, error } = await supabase
        .from("visitor tracking")
        .select("visitor_id, created_at");

      if (error) {
        alert("Visitor Data Error: " + error.message);
        setLoading(false);
        return;
      }

      const rows = data ?? [];
      const now = new Date();
      const todayDate = now.toLocaleDateString("en-CA");
      const monthDate = todayDate.slice(0, 7);

      setTotal(rows.length);
      setUnique(new Set(rows.map((v) => v.visitor_id).filter(Boolean)).size);

      setToday(
        rows.filter(
          (v) =>
            new Date(v.created_at).toLocaleDateString("en-CA") === todayDate
        ).length
      );

      setMonth(
        rows.filter(
          (v) =>
            new Date(v.created_at).toLocaleDateString("en-CA").slice(0, 7) ===
            monthDate
        ).length
      );

      setLoading(false);
    }

    loadVisitors();
  }, []);

  const cards = [
    ["Total Visits", total],
    ["Unique Visitors", unique],
    ["Today Visits", today],
    ["Monthly Visits", month],
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">
          Website Visitor Analytics
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value]) => (
            <div key={label} className="rounded-xl border bg-white p-6">
              <p className="text-slate-500">{label}</p>
              <h2 className="mt-2 text-3xl font-bold">
                {loading ? "..." : value}
              </h2>
            </div>
          ))}
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 rounded-lg bg-blue-950 px-5 py-3 text-white"
        >
          वापस जाएँ
        </button>
      </div>
    </main>
  );
}
