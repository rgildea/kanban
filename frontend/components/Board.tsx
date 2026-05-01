"use client";

import { useBoardState } from "@/hooks/useBoardState";
import { Card } from "@/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import CardModal from "./CardModal";
import Column from "./Column";

export default function Board() {
  const { columns, moveCard, addCard, deleteCard, renameColumn, updateCard } =
    useBoardState();
  const [openCard, setOpenCard] = useState<{
    card: Card;
    columnId: string;
  } | null>(null);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    moveCard(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#032147] px-8 py-4 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full bg-[#ecad0a]" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            Kanban Board
          </h1>
          <span className="ml-2 text-xs text-[#888888] font-medium border border-white/10 rounded-full px-2.5 py-0.5 bg-white/5">
            {columns.reduce((acc, col) => acc + col.cards.length, 0)} cards
          </span>
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-x-auto px-8 py-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-5 items-start min-w-max">
            {columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                onRename={renameColumn}
                onAddCard={addCard}
                onDeleteCard={deleteCard}
                onOpenCard={(card, columnId) => setOpenCard({ card, columnId })}
              />
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Card modal */}
      {openCard && (
        <CardModal
          card={openCard.card}
          columnId={openCard.columnId}
          onClose={() => setOpenCard(null)}
          onUpdate={(colId, cardId, title, details) => {
            updateCard(colId, cardId, title, details);
            setOpenCard(null);
          }}
        />
      )}
    </div>
  );
}
