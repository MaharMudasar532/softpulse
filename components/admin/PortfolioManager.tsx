"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";
import { AdminContentLoader } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase/client";
import type { PortfolioItem } from "@/lib/types";

const emptyItem: Omit<PortfolioItem, "id"> = {
  slug: "",
  title: "",
  category: "",
  description: "",
  long_description: "",
  features: [],
  image_url: null,
  link: null,
  website_url: null,
  google_play_url: null,
  apple_store_url: null,
};

const categories = [
  "Mobile App",
  "React Native",
  "Shopify",
  "Web App",
  "AI Integration",
];

export function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState("");

  const supabase = createClient();

  async function loadItems() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("portfolio_items")
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
    setFeaturesText("");
    setIsNew(true);
  }

  function startEdit(item: PortfolioItem) {
    setEditing({ ...item });
    setFeaturesText((item.features || []).join("\n"));
    setIsNew(false);
  }

  function buildPayload(item: PortfolioItem) {
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    return {
      slug: item.slug || null,
      title: item.title,
      category: item.category,
      description: item.description,
      long_description: item.long_description || null,
      features,
      image_url: item.image_url,
      link: item.website_url || item.link,
      website_url: item.website_url || item.link,
      google_play_url: item.google_play_url || null,
      apple_store_url: item.apple_store_url || null,
    };
  }

  async function handleSave() {
    if (!supabase || !editing) return;
    setSaving(true);

    const payload = buildPayload(editing);

    if (isNew) {
      const { error } = await supabase.from("portfolio_items").insert(payload);
      if (!error) {
        setEditing(null);
        await loadItems();
      }
    } else {
      const { error } = await supabase
        .from("portfolio_items")
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
    if (!supabase || !confirm("Delete this portfolio item?")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    await loadItems();
  }

  if (loading) {
    return <AdminContentLoader count={4} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted text-sm">{items.length} portfolio items</p>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-primary/30 p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center sticky top-0 bg-white pb-2">
            <h3 className="font-semibold">
              {isNew ? "New Portfolio Item" : "Edit Portfolio Item"}
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
              placeholder="Slug (e.g. pacepal) *"
              value={editing.slug || ""}
              onChange={(e) =>
                setEditing({ ...editing, slug: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              placeholder="Image URL"
              value={editing.image_url || ""}
              onChange={(e) =>
                setEditing({ ...editing, image_url: e.target.value || null })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Website URL"
              value={editing.website_url || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  website_url: e.target.value || null,
                  link: e.target.value || null,
                })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Google Play URL"
              value={editing.google_play_url || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  google_play_url: e.target.value || null,
                })
              }
              className="px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              placeholder="Apple App Store URL"
              value={editing.apple_store_url || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  apple_store_url: e.target.value || null,
                })
              }
              className="md:col-span-2 px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <textarea
            placeholder="Short description (card) *"
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <textarea
            placeholder="Long description (detail page)"
            value={editing.long_description || ""}
            onChange={(e) =>
              setEditing({ ...editing, long_description: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <textarea
            placeholder="Features (one per line)"
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono text-sm"
          />

          <button
            onClick={handleSave}
            disabled={
              saving || !editing.title || !editing.category || !editing.slug
            }
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

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Title</th>
              <th className="text-left px-6 py-3 font-medium">Slug</th>
              <th className="text-left px-6 py-3 font-medium">Stores</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-6 py-4">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted">{item.category}</div>
                </td>
                <td className="px-6 py-4 text-muted">{item.slug || "—"}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {item.google_play_url && (
                      <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs">
                        Play
                      </span>
                    )}
                    {item.apple_store_url && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">
                        iOS
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
