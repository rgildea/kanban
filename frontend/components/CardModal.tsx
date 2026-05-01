"use client";

import { Card } from "@/types";
import { useEffect, useRef, useState } from "react";

interface Props {
  card: Card;
  columnId: string;
  onClose: () => void;
  onUpdate: (
    columnId: string,
    cardId: string,
    title: string,
    details: string,
  ) => void;
}

export default function CardModal({
  card,
  columnId,
  onClose,
  onUpdate,
}: Props) {
  const [title, setTitle] = useState(card.title);
  const [details, setDetails] = useState(card.details);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSave() {
    if (!title.trim()) return;
    onUpdate(columnId, card.id, title, details);
    onClose();
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      data-testid="card-modal"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden">
        {/* Modal header */}
        <div className="px-6 py-4 border-b-2 border-accent-yellow flex items-center justify-between">
          <h2 className="text-base font-bold text-dark-navy">Edit Card</h2>
          <button
            onClick={onClose}
            className="text-gray-text hover:text-dark-navy transition-colors p-1 rounded hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-text uppercase tracking-wide mb-1.5">
              Title
            </label>
            <input
              data-testid="modal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 text-dark-navy focus:outline-none focus:ring-2 focus:ring-blue-primary/40 focus:border-blue-primary"
              placeholder="Card title"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-text uppercase tracking-wide mb-1.5">
              Details
            </label>
            <textarea
              data-testid="modal-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 text-dark-navy focus:outline-none focus:ring-2 focus:ring-blue-primary/40 focus:border-blue-primary resize-none"
              placeholder="Add more detail..."
            />
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 pb-5 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-text rounded-lg hover:bg-gray-100 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            data-testid="modal-save"
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-purple-secondary text-white hover:bg-[#5e2d75] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
