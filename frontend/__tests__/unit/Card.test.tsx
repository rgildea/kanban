import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "@/components/Card";
import { Card as CardType } from "@/types";

// Mock @hello-pangea/dnd Draggable
jest.mock("@hello-pangea/dnd", () => ({
  Draggable: ({
    children,
  }: {
    children: (provided: object, snapshot: object) => React.ReactNode;
  }) =>
    children(
      { innerRef: () => {}, draggableProps: {}, dragHandleProps: {} },
      { isDragging: false }
    ),
}));

const card: CardType = {
  id: "test-1",
  title: "Test card title",
  details: "Test card details",
};

describe("Card component", () => {
  it("renders the card title", () => {
    const onDelete = jest.fn();
    const onOpen = jest.fn();
    render(
      <Card card={card} index={0} columnId="col-1" onDelete={onDelete} onOpen={onOpen} />
    );
    expect(screen.getByText("Test card title")).toBeInTheDocument();
  });

  it("renders the card details", () => {
    const onDelete = jest.fn();
    const onOpen = jest.fn();
    render(
      <Card card={card} index={0} columnId="col-1" onDelete={onDelete} onOpen={onOpen} />
    );
    expect(screen.getByText("Test card details")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = jest.fn();
    const onOpen = jest.fn();
    render(
      <Card card={card} index={0} columnId="col-1" onDelete={onDelete} onOpen={onOpen} />
    );
    fireEvent.click(screen.getByTestId("delete-card"));
    expect(onDelete).toHaveBeenCalledWith("col-1", "test-1");
  });

  it("calls onOpen when card body is clicked", () => {
    const onDelete = jest.fn();
    const onOpen = jest.fn();
    render(
      <Card card={card} index={0} columnId="col-1" onDelete={onDelete} onOpen={onOpen} />
    );
    fireEvent.click(screen.getByText("Test card title"));
    expect(onOpen).toHaveBeenCalledWith(card, "col-1");
  });
});
