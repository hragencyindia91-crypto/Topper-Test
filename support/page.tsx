
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTickets = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("student_email", user.email)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setTickets(data || []);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("पहले अपनी समस्या लिखें");
      return;
    }

    setLoading(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      alert("पहले Login करें");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("support_tickets")
     .insert({
  student_id: user.id,
  student_email: user.email,
  subject: "Student Support",
  message: message.trim(),
});
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setMessage("");
    window.location.href = "/";
    await loadTickets();
  
  };

  return (
    <main className="max-w-2xl mx-auto p-5">
      <button
  onClick={() => window.location.href = "/"}
  className="bg-gray-200 text-black px-4 py-2 rounded-lg mb-4"
>
  ← वापस जाएँ
</button>
      <h1 className="text-3xl font-bold mb-2">Student Support</h1>

      <p className="text-gray-600 mb-4">
        अपनी समस्या यहाँ लिखकर भेजें।
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="यहाँ अपनी समस्या लिखें..."
        rows={5}
        className="w-full border-2 border-gray-400 rounded-lg p-4 text-black bg-white"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="w-full bg-blue-950 text-white p-3 rounded-lg mt-3 font-bold"
      >
        {loading ? "भेज रहे हैं..." : "समस्या भेजें"}
      </button>

      <h2 className="text-xl font-bold mt-8 mb-4">मेरी समस्याएँ</h2>

      {tickets.map((ticket) => (
        <div key={ticket.id} className="border rounded-lg p-4 mb-3">
          <p>{ticket.message}</p>
          <p className="text-green-700 mt-3">
            Admin का जवाब: {ticket.admin_reply || "अभी जवाब नहीं आया है।"}
          </p>
        </div>
      ))}
    </main>
  );
}
