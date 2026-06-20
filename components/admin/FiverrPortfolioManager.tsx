"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";
import { AdminContentLoader } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";
import type { FiverrPortfolioItem } from "@/lib/types";

const emptyItem: Omit<FiverrPortfolioItem, "id"> = {
  title: "",
  description: "",
  category: "Mobile App Development",
  image_url: null,
  fiverr_url: "https://www.fiverr.com/developerpro532",
  sort_order: 0,
};

export function FiverrPortfolioManager() {
  const [items, setItems] = useState<FiverrPortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FiverrPortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  async function loadItems() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("fiverr_portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function startNew() {
    setEditing({ id: "", ...emptyItem, sort_order: items.length + 1 });
    setIsNew(true);
  }

  function startEdit(item: FiverrPortfolioItem) {
    setEditing({ ...item });
    setIsNew(false);
  }

  async function handleSave() {
    if (!supabase || !editing) return;
    setSaving(true);

    const payload = {
      title: editing.title,
      description: editing.description,
      category: editing.category,
      image_url: editing.image_url,
      fiverr_url: editing.fiverr_url,
      sort_order: editing.sort_order,
    };

    if (isNew) {
      const { error } = await supabase.from("fiverr_portfolio_items").insert(payload);
      if (!error) {
        setEditing(null);
        await loadItems();
      }
    } else {
      const { error } = await supabase
        .from("fiverr_portfolio_items")
        .update(payload)
        .eq("id", editing.id);
      if (!error) {
        setEditing(null);
        await loadItems();
      }
    }

    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!supabase || !confirm("Delete this Fiverr item?")) return;
    await supabase.from("fiverr_portfolio_items").delete().eq("id", id);
    await loadItems();
  }

  if (loading) {
    return <AdminContentLoader count={3} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted text-sm">
          {items.length} Fiverr gigs — shown on homepage
        </p>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1dbf73] text-white text-sm font-semibold hover:bg-[#19a463]"
        >
          <Plus className="w-4 h-4" />
          Add Gig
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-[#1dbf73]/30 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {isNew ? "New Fiverr Gig" : "Edit Fiverr Gig"}
            </h3>
            <button onClick={() => setEditing(null)}>
              <X className="w-5 h-5 text-muted" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Title *"
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Category"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Image URL"
              value={editing.image_url || ""}
              onChange={(e) =>
                setEditing({ ...editing, image_url: e.target.value || null })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Fiverr URL"
              value={editing.fiverr_url || ""}
              onChange={(e) =>
                setEditing({ ...editing, fiverr_url: e.target.value || null })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="number"
              placeholder="Sort order"
              value={editing.sort_order}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  sort_order: parseInt(e.target.value) || 0,
                })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <textarea
            placeholder="Description *"
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <button
            onClick={handleSave}
            disabled={saving || !editing.title || !editing.description}
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
            className="bg-white rounded-2xl border border-border p-5 flex justify-between gap-4"
          >
            <div className="min-w-0">
              <span className="text-xs text-[#1dbf73] font-medium">
                {item.category}
              </span>
              <h4 className="font-semibold truncate">{item.title}</h4>
              <p className="text-sm text-muted line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => startEdit(item)}
                className="p-2 rounded-lg hover:bg-blue-50 text-primary"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
