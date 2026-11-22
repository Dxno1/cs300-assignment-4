
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import App from "./App.jsx";

afterEach(() => {
  cleanup();
});

test("displays the original book collection", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "My Reading List" })
  ).toBeInTheDocument();

  expect(screen.getByText("Robot Garden")).toBeInTheDocument();
  expect(screen.getByText("River Sketches")).toBeInTheDocument();
});

test("adds a new book to the collection", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Book title"), {
    target: { value: "The Lost World" }
  });

  fireEvent.change(screen.getByLabelText("Creator"), {
    target: { value: "Arthur Doyle" }
  });

  fireEvent.click(screen.getByRole("button", { name: "Add Book" }));

  expect(screen.getByText("The Lost World")).toBeInTheDocument();
  expect(screen.getByText("By Arthur Doyle")).toBeInTheDocument();
});

test("shows an error when required fields are empty", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Add Book" }));

  expect(
    screen.getByRole("alert")
  ).toHaveTextContent("Please enter both a book title and creator.");
});

test("changes a book reading status", () => {
  render(<App />);

  const book = screen
    .getByRole("heading", { name: "Robot Garden" })
    .closest("article");

  expect(within(book).getByText("Unread")).toBeInTheDocument();

  fireEvent.click(
    within(book).getByRole("button", { name: "Mark as Read" })
  );

  expect(within(book).getByText("Read")).toBeInTheDocument();
});

test("removes a book from the collection", () => {
  render(<App />);

  const book = screen
    .getByRole("heading", { name: "Robot Garden" })
    .closest("article");

  fireEvent.click(
    within(book).getByRole("button", { name: "Remove" })
  );

  expect(screen.queryByText("Robot Garden")).not.toBeInTheDocument();
});

test("filters books by reading status", () => {
  render(<App />);

  const book = screen
    .getByRole("heading", { name: "Robot Garden" })
    .closest("article");

  fireEvent.click(
    within(book).getByRole("button", { name: "Mark as Read" })
  );

  fireEvent.change(screen.getByLabelText("Reading status"), {
    target: { value: "read" }
  });

  expect(screen.getByText("Robot Garden")).toBeInTheDocument();
  expect(screen.queryByText("River Sketches")).not.toBeInTheDocument();
});

test("searches books by title", () => {
  render(<App />);

  fireEvent.change(screen.getByRole("searchbox", { name: "Search books" }), {
    target: { value: "Robot Garden" }
  });

  expect(screen.getByText("Robot Garden")).toBeInTheDocument();
  expect(screen.queryByText("River Sketches")).not.toBeInTheDocument();
});
