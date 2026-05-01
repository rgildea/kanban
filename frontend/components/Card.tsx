"use client";

import { Card as CardType } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

interface Props {
  card: CardType;
  index: number;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
  onOpen: (card: CardType, columnId: string) => void;
}

export default function Card({
  card,
  index,
  columnId,
  onDelete,
  onOpen,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid="card"
          className={`group relative bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 cursor-pointer transition-all duration-150
            ${snapshot.isDragging ? "shadow-xl rotate-1 border-blue-primary scale-105" : "hover:shadow-md hover:border-blue-primary/40"}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onOpen(card, columnId)}
        >
          {/* Yellow accent left border */}
          <div className="absolute left-0 top-0 bottom-0 w-0.75 rounded-l-lg bg-accent-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

          <p className="text-sm font-medium text-dark-navy leading-snug pr-6">
            {card.title}
          </p>
          {card.details && (
            <p className="mt-1 text-xs text-gray-text line-clamp-2 leading-relaxed">
              {card.details}
            </p>
          )}

          <button
            data-testid="delete-card"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(columnId, card.id);
            }}
            className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded text-gray-text hover:text-red-500 hover:bg-red-50 transition-all duration-100
              ${hovered || snapshot.isDragging ? "opacity-100" : "opacity-0"}`}
            aria-label="Delete card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
}
