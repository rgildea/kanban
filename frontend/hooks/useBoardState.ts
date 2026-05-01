"use client";

import { initialBoard } from "@/data/initialData";
import { Board, Card } from "@/types";
import { useState } from "react";
export function useBoardState() {
  const [columns, setColumns] = useState<Board>(initialBoard);

  function moveCard(
    sourceColId: string,
    destColId: string,
    sourceIndex: number,
    destIndex: number,
  ) {
    setColumns((prev) => {
      const next = prev.map((col) => ({ ...col, cards: [...col.cards] }));
      const sourceCol = next.find((c) => c.id === sourceColId)!;
      const destCol = next.find((c) => c.id === destColId)!;
      const [moved] = sourceCol.cards.splice(sourceIndex, 1);
      destCol.cards.splice(destIndex, 0, moved);
      return next;
    });
  }

  function addCard(columnId: string, title: string, details: string) {
    const card: Card = {
      id: crypto.randomUUID(),
      title: title.trim(),
      details: details.trim(),
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, card] } : col,
      ),
    );
  }

  function deleteCard(columnId: string, cardId: string) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col,
      ),
    );
  }

  function renameColumn(columnId: string, name: string) {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, name } : col)),
    );
  }

  function updateCard(
    columnId: string,
    cardId: string,
    title: string,
    details: string,
  ) {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c) =>
                c.id === cardId
                  ? { ...c, title: title.trim(), details: details.trim() }
                  : c,
              ),
            }
          : col,
      ),
    );
  }

  return { columns, moveCard, addCard, deleteCard, renameColumn, updateCard };
}
