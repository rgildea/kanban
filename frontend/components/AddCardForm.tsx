"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onAdd: (title: string, details: string) => void;
  onCancel: () => void;
}

export default function AddCardForm({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, details);
    setTitle("");
    setDetails("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onCancel();
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="mt-2">
      <textarea
        ref={inputRef}
        data-testid="add-card-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title"
        rows={2}
        className="w-full px-3 py-2 text-sm rounded-lg border border-[#209dd7] bg-white text-[#032147] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#209dd7]/40 resize-none"
      />
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Details (optional)"
        rows={2}
        className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-[#032147] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#209dd7]/40 resize-none"
      />
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          data-testid="add-card-submit"
          disabled={!title.trim()}
          className="flex-1 py-1.5 text-sm font-medium rounded-lg bg-[#753991] text-white hover:bg-[#5e2d75] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-[#888888] rounded-lg hover:bg-gray-100 transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
