
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const visitorId =
          localStorage.getItem("topper_visitor_id") ||
          crypto.randomUUID();

        localStorage.setItem("topper_visitor_id", visitorId);

        const { error } = await supabase
          .from("visitor tracking")
          .insert({
            visitor_id: visitorId,
            country: "India",
          });

        if (error) {
          alert("Visitor Error: " + error.message);
        } else {
       
        }
      } catch (error) {
        alert("Error: " + String(error));
      }
    };

    trackVisitor();
  }, []);

  return null;
}
