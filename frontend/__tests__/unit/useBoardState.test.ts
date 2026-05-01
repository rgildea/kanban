import { renderHook, act } from "@testing-library/react";
import { useBoardState } from "@/hooks/useBoardState";
import { initialBoard } from "@/data/initialData";

describe("useBoardState", () => {
  it("initialises with dummy board data", () => {
    const { result } = renderHook(() => useBoardState());
    expect(result.current.columns).toHaveLength(5);
    expect(result.current.columns[0].name).toBe("Backlog");
  });

  it("addCard adds a card to the correct column", () => {
    const { result } = renderHook(() => useBoardState());
    const firstColId = result.current.columns[0].id;
    const before = result.current.columns[0].cards.length;

    act(() => {
      result.current.addCard(firstColId, "New card", "Some details");
    });

    const col = result.current.columns.find((c) => c.id === firstColId)!;
    expect(col.cards).toHaveLength(before + 1);
    expect(col.cards[col.cards.length - 1].title).toBe("New card");
    expect(col.cards[col.cards.length - 1].details).toBe("Some details");
  });

  it("deleteCard removes the card from the column", () => {
    const { result } = renderHook(() => useBoardState());
    const firstCol = result.current.columns[0];
    const cardToDelete = firstCol.cards[0];

    act(() => {
      result.current.deleteCard(firstCol.id, cardToDelete.id);
    });

    const col = result.current.columns.find((c) => c.id === firstCol.id)!;
    expect(col.cards.find((c) => c.id === cardToDelete.id)).toBeUndefined();
  });

  it("renameColumn updates the column name", () => {
    const { result } = renderHook(() => useBoardState());
    const colId = result.current.columns[0].id;

    act(() => {
      result.current.renameColumn(colId, "Renamed");
    });

    expect(result.current.columns[0].name).toBe("Renamed");
  });

  it("moveCard moves a card between columns", () => {
    const { result } = renderHook(() => useBoardState());
    const srcCol = result.current.columns[0];
    const destCol = result.current.columns[1];
    const movingCard = srcCol.cards[0];
    const srcBefore = srcCol.cards.length;
    const destBefore = destCol.cards.length;

    act(() => {
      result.current.moveCard(srcCol.id, destCol.id, 0, 0);
    });

    const updatedSrc = result.current.columns.find((c) => c.id === srcCol.id)!;
    const updatedDest = result.current.columns.find((c) => c.id === destCol.id)!;
    expect(updatedSrc.cards).toHaveLength(srcBefore - 1);
    expect(updatedDest.cards).toHaveLength(destBefore + 1);
    expect(updatedDest.cards[0].id).toBe(movingCard.id);
  });

  it("updateCard changes title and details of a card", () => {
    const { result } = renderHook(() => useBoardState());
    const col = result.current.columns[0];
    const card = col.cards[0];

    act(() => {
      result.current.updateCard(col.id, card.id, "Updated title", "Updated details");
    });

    const updatedCol = result.current.columns.find((c) => c.id === col.id)!;
    const updatedCard = updatedCol.cards.find((c) => c.id === card.id)!;
    expect(updatedCard.title).toBe("Updated title");
    expect(updatedCard.details).toBe("Updated details");
  });
});
