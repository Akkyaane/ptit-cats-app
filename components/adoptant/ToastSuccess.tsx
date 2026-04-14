"use client";

import { useEffect, useState } from "react";

export default function ToastSuccess({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 3000);
    const hideTimer = setTimeout(() => setVisible(false), 3300);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 px-6 py-3 rounded-xl shadow-lg bg-[var(--color-quaternary)] text-white font-bold text-sm"
      style={{ animation: leaving ? "fadeOutDown 0.3s ease forwards" : "fadeInUp 0.3s ease forwards" }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeOutDown {
          from { opacity: 1; transform: translateX(-50%) translateY(0); }
          to   { opacity: 0; transform: translateX(-50%) translateY(16px); }
        }
      `}</style>
      ✓ {message}
    </div>
  );
}
