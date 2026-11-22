
import { useMemo, useState } from "react";
import "./styles.css";
import booksData from "../data/books.json";

// Header component
function Header() {
  return (
    <header className="header">
      <span className="eyebrow">Your personal library</span>
      <h1>My Reading List</h1>
      <p>Keep track of the stories you want to read.</p>
    </header>
  );
}

// Collection status
function StatusMessage({ count, message }) {
  return (
    <div className="status-message" aria-live="polite">
      <p>{count} books in your collection.</p>
      {message && <p>{message}</p>}
    </div>
  );
}

// Add book form
function ItemForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Please enter a book title.";
    }

    if (!creator.trim()) {
      newErrors.creator = "Please enter a creator name.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onAddBook({
      title: title.trim(),
      creator: creator.trim()
    });

    setTitle("");
    setCreator("");
    setErrors({});
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Add a new book</h2>
      <p>Grow your collection with another story.</p>

      <label htmlFor="book-title">Book title</label>

      <input
        id="book-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter book title"
        aria-invalid={Boolean(errors.title)}
        aria-describedby={errors.title ? "title-error" : undefined}
      />

      {errors.title && (
        <p id="title-error" className="error-message">
          {errors.title}
        </p>
      )}

      <label htmlFor="book-creator">Creator</label>

      <input
        id="book-creator"
        value={creator}
        onChange={(event) => setCreator(event.target.value)}
        placeholder="Enter creator name"
        aria-invalid={Boolean(errors.creator)}
        aria-describedby={errors.creator ? "creator-error" : undefined}
      />

      {errors.creator && (
        <p id="creator-error" className="error-message">
          {errors.creator}
        </p>
      )}

      {(errors.title || errors.creator) && (
        <p role="alert" className="error-message">
          Please enter both a book title and creator.
        </p>
      )}

      <button type="submit">Add Book</button>
    </form>
  );
}

// Search and filter controls
function CollectionControls({
  search,
  setSearch,
  filter,
  setFilter
}) {
  return (
    <section className="collection-controls">
      <label className="search-label" htmlFor="book-search">
        Search books
      </label>

      <input
        id="book-search"
        type="search"
        placeholder="Search by title or creator..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <label htmlFor="reading-filter">Reading status</label>

      <select
        id="reading-filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All books</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>
    </section>
  );
}

// Reusable book action buttons
function BookActions({ book, onRemove, onToggleRead }) {
  return (
    <div className="book-actions">
      <button onClick={() => onToggleRead(book.id)}>
        Mark as {book.isRead ? "Unread" : "Read"}
      </button>

      <button
        className="remove-button"
        onClick={() => onRemove(book.id)}
      >
        Remove
      </button>
    </div>
  );
}

// Individual book card
function ItemCard({ book, onRemove, onToggleRead }) {
  return (
    <article className="book-card">
      <p className="book-category">
        {book.category || "Uncategorized"}
      </p>

      <h2>{book.title}</h2>

      <p>By {book.creator}</p>

      <p>
        {book.description ||
          "Added to your personal reading list."}
      </p>

      <p className="reading-status">
        {book.isRead ? "Read" : "Unread"}
      </p>

      <BookActions
        book={book}
        onRemove={onRemove}
        onToggleRead={onToggleRead}
      />
    </article>
  );
}

// Book collection
function ItemList({ items, onRemove, onToggleRead }) {
  if (items.length === 0) {
    return (
      <p className="empty-message">
        No books found. Try another search or add a new book.
      </p>
    );
  }

  return (
    <section className="book-list">
      {items.map((book) => (
        <ItemCard
          key={book.id}
          book={book}
          onRemove={onRemove}
          onToggleRead={onToggleRead}
        />
      ))}
    </section>
  );
}

// Main application
export default function App() {
  const [items, setItems] = useState(() =>
    booksData.map((book) => ({
      ...book,
      isRead: Boolean(book.isRead)
    }))
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");

  function handleAddBook(newBook) {
    const book = {
      id: `custom-${Date.now()}`,
      title: newBook.title,
      creator: newBook.creator,
      category: "Uncategorized",
      description: "Added to your personal reading list.",
      minutes: 0,
      isRead: false
    };

    setItems((previous) => [...previous, book]);
    setMessage(`${book.title} was added to your collection.`);
  }

  function handleRemove(id) {
    setItems((previous) =>
      previous.filter((book) => book.id !== id)
    );

    setMessage("Book removed from your collection.");
  }

  function handleToggleRead(id) {
    setItems((previous) =>
      previous.map((book) =>
        book.id === id
          ? { ...book, isRead: !book.isRead }
          : book
      )
    );

    setMessage("Reading status updated.");
  }

  const filteredItems = useMemo(() => {
    return items.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.creator.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "read" && book.isRead) ||
        (filter === "unread" && !book.isRead);

      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter]);

  return (
    <main className="app">
      <Header />

      <ItemForm onAddBook={handleAddBook} />

      <StatusMessage
        count={items.length}
        message={message}
      />

      <CollectionControls
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <ItemList
        items={filteredItems}
        onRemove={handleRemove}
        onToggleRead={handleToggleRead}
      />
    </main>
  );
}
  