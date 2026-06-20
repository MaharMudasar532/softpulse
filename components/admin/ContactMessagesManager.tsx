"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { AdminContentLoader } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";
import type { ContactSubmissionRecord } from "@/lib/types";

export function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactSubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  async function loadMessages() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Delete this message?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    await loadMessages();
  }

  if (loading) {
    return <AdminContentLoader count={3} />;
  }

  return (
    <div className="space-y-4">
      <p className="text-muted text-sm">{messages.length} messages received</p>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white rounded-2xl border border-border p-6"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold">{msg.name}</h4>
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Mail className="w-3.5 h-3.5" />
                {msg.email}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(msg.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm leading-relaxed">{msg.message}</p>
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-muted text-center py-12">No messages yet.</p>
      )}
    </div>
  );
}
