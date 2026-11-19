
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAIL = "hrpramodnagar@gmail.com";

export default function SupportAdminPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const loadTickets = async () => {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setTickets(data || []);
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data.user?.email?.toLowerCase();

      if (email !== ADMIN_EMAIL.toLowerCase()) {
        alert("केवल Admin इस पेज को खोल सकता है।");
        setLoading(false);
        return;
      }

      setAllowed(true);
      await loadTickets();
      setLoading(false);
    };

    checkAdmin();
  }, []);

  const sendReply = async (id: number) => {
    const reply = replies[id]?.trim();

    if (!reply) {
      alert("जवाब लिखें");
      return;
    }

    const { error } = await supabase
      .from("support_tickets")
      .update({ admin_reply: reply })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("जवाब भेज दिया गया");
    setReplies((old) => ({ ...old, [id]: "" }));
    await loadTickets();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  if (!allowed) {
    return <p className="p-6">Admin Login जरूरी है।</p>;
  }

  return (
    <main className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Student Support Admin</h1>

      <button
        onClick={loadTickets}
        className="bg-blue-950 text-white px-4 py-2 rounded-lg mb-5"
      >
        Refresh Messages
      </button>

      {tickets.length === 0 && (
        <p>अभी कोई समस्या नहीं आई है।</p>
      )}

      {tickets.map((ticket) => (
        <div key={ticket.id} className="border rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-500">{ticket.student_email}</p>
          <p className="font-bold mt-2">{ticket.message}</p>

          <p className="text-green-700 mt-3">
            पुराना जवाब: {ticket.admin_reply || "अभी जवाब नहीं दिया"}
          </p>

          <textarea
            value={replies[ticket.id] || ""}
            onChange={(e) =>
              setReplies((old) => ({
                ...old,
                [ticket.id]: e.target.value,
              }))
            }
            placeholder="विद्यार्थी को जवाब लिखें..."
            className="w-full border rounded-lg p-3 mt-3"
          />

          <button
            onClick={() => sendReply(ticket.id)}
            className="bg-green-700 text-white px-5 py-2 rounded-lg mt-2"
          >
            जवाब भेजें
          </button>
        </div>
      ))}
    </main>
  );
}
