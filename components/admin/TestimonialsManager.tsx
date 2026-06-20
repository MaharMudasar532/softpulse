"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Star, Loader2 } from "lucide-react";
import { AdminContentLoader } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/lib/types";

const emptyItem: Omit<Testimonial, "id"> = {
  name: "",
  role: "",
  company: "",
  content: "",
  avatar_url: null,
  rating: 5,
};

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  async function loadItems() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function startNew() {
    setEditing({ id: "", ...emptyItem });
    setIsNew(true);
  }

  function startEdit(item: Testimonial) {
    setEditing({ ...item });
    setIsNew(false);
  }

  async function handleSave() {
    if (!supabase || !editing) return;
    setSaving(true);

    if (isNew) {
      const { error } = await supabase.from("testimonials").insert({
        name: editing.name,
        role: editing.role,
        company: editing.company,
        content: editing.content,
        avatar_url: editing.avatar_url,
        rating: editing.rating,
      });
      if (!error) {
        setEditing(null);
        await loadItems();
      }
    } else {
      const { error } = await supabase
        .from("testimonials")
        .update({
          name: editing.name,
          role: editing.role,
          company: editing.company,
          content: editing.content,
          avatar_url: editing.avatar_url,
          rating: editing.rating,
        })
        .eq("id", editing.id);
      if (!error) {
        setEditing(null);
        await loadItems();
      }
    }

    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    await loadItems();
  }

  if (loading) {
    return <AdminContentLoader count={3} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted text-sm">{items.length} testimonials</p>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-primary/30 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {isNew ? "New Testimonial" : "Edit Testimonial"}
            </h3>
            <button onClick={() => setEditing(null)}>
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Role"
              value={editing.role}
              onChange={(e) =>
                setEditing({ ...editing, role: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Company"
              value={editing.company}
              onChange={(e) =>
                setEditing({ ...editing, company: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">Rating:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEditing({ ...editing, rating: n })}
                >
                  <Star
                    className={`w-5 h-5 ${n <= editing.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Testimonial content"
            value={editing.content}
            onChange={(e) =>
              setEditing({ ...editing, content: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <button
            onClick={handleSave}
            disabled={saving || !editing.name || !editing.content}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-border p-6"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-muted">
                  {item.role}, {item.company}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(item)}
                  className="p-1.5 rounded-lg hover:bg-blue-50 text-primary"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-muted leading-relaxed">
              &ldquo;{item.content}&rdquo;
            </p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-muted text-center py-12 col-span-2">
            No testimonials yet.
          </p>
        )}
      </div>
    </div>
  );
}
