"use client";

import { Card as CardType, Column as ColumnType } from "@/types";
import { Droppable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import AddCardForm from "./AddCardForm";
import Card from "./Card";

interface Props {
  column: ColumnType;
  onRename: (columnId: string, name: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onOpenCard: (card: CardType, columnId: string) => void;
}

export default function Column({
  column,
  onRename,
  onAddCard,
  onDeleteCard,
  onOpenCard,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [nameValue, setNameValue] = useState(column.name);
  const [showAddForm, setShowAddForm] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) nameInputRef.current?.select();
  }, [editing]);

  function commitRename() {
    const trimmed = nameValue.trim();
    if (trimmed) onRename(column.id, trimmed);
    else setNameValue(column.name);
    setEditing(false);
  }

  function handleNameKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") {
      setNameValue(column.name);
      setEditing(false);
    }
  }

  return (
    <div className="flex flex-col w-72 shrink-0 bg-[#e8edf2] rounded-xl shadow-sm">
      {/* Column header */}
      <div className="px-4 pt-4 pb-3 border-b-2 border-[#ecad0a]">
        <div className="flex items-center justify-between gap-2">
          {editing ? (
            <input
              ref={nameInputRef}
              data-testid="column-name-input"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={commitRename}
              onKeyDown={handleNameKeyDown}
              className="flex-1 text-sm font-bold text-[#032147] bg-white border border-[#209dd7] rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#209dd7]/40"
            />
          ) : (
            <button
              data-testid="column-name"
              onClick={() => {
                setEditing(true);
                setNameValue(column.name);
              }}
              className="flex-1 text-left text-sm font-bold text-[#032147] hover:text-[#209dd7] transition-colors duration-100 truncate"
              title="Click to rename"
            >
              {column.name}
            </button>
          )}
          <span className="ml-1 text-xs font-semibold text-[#888888] bg-white/60 rounded-full px-2 py-0.5 tabular-nums">
            {column.cards.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            data-testid={`column-${column.id}`}
            className={`flex-1 px-3 py-3 flex flex-col gap-2 min-h-[80px] transition-colors duration-150 rounded-b-xl
              ${snapshot.isDraggingOver ? "bg-[#d4e8f5]" : ""}`}
          >
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                columnId={column.id}
                onDelete={onDeleteCard}
                onOpen={onOpenCard}
              />
            ))}
            {provided.placeholder}

            {showAddForm ? (
              <AddCardForm
                onAdd={(title, details) => {
                  onAddCard(column.id, title, details);
                  setShowAddForm(false);
                }}
                onCancel={() => setShowAddForm(false)}
              />
            ) : (
              <button
                data-testid="add-card-btn"
                onClick={() => setShowAddForm(true)}
                className="mt-1 w-full py-1.5 text-xs font-medium text-[#888888] hover:text-[#209dd7] hover:bg-white/60 rounded-lg border border-dashed border-[#c5cdd6] hover:border-[#209dd7] transition-all duration-150 flex items-center justify-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add a card
              </button>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
