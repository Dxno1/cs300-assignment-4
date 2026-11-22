# Assignment 4 Starter: React Component Collection

This folder is your starting point for Assignment 4. Copy everything inside it, not the folder itself, into your cloned `cs300-assignment-4` repository.

## What Is Here

- `package.json` and `package-lock.json`: the exact React and Vitest versions. Do not edit them.
- `vite.config.js` and `index.html`: the Vite setup. You add one `base` line to `vite.config.js` when you deploy.
- `src/App.jsx`: your app starts here.
- `src/App.test.jsx`: two sample tests so `npm test` passes from the start. Add your own test files next to your components.
- `src/main.jsx`, `src/styles.css`, and `src/test-setup.js`: startup, your CSS, and test setup.
- `data/`: the four scenario datasets, plus `empty.json`, `incomplete.json`, and `boundary-records.json` for checking unusual data.
- `SCENARIOS.md`: the four scenarios. Pick one.
- `.gitignore`: keeps `node_modules` and `dist` out of Git.
- `.github/workflows/deploy.yml`: the GitHub Pages workflow. It builds and publishes your app on every push to `main`; you do not edit it. The `.github` folder starts with a dot and may be hidden; on a Mac, press Shift+Cmd+. in Finder to see it before you copy.

## Your First 15 Minutes

You need Node 24 (any 24.x version; `node --version` starts with `v24`; an npm engine warning about the exact version is fine).

1. Open your `cs300-assignment-4` folder in VS Code and choose **Terminal > New Terminal**.
2. Run `npm ci`. It installs the exact packages and takes a minute or two. npm may report vulnerabilities in test tools; do not run `npm audit fix`, which would change the lockfile.
3. Run `npm run dev` and open the address it prints, usually `http://localhost:5173/`. You should see "Your application starts here."
4. Press Ctrl+C, then run `npm test`. The two sample tests should pass.
5. Open `SCENARIOS.md`, pick a scenario, and open its data file in `data/`.
6. Replace everything in this README with your name and your scenario.
7. Commit with the message `Add starter files and choose scenario` and push.

## Your README Before You Submit

By the deadline, your README must have:

- Your name and your scenario.
- Your live URL.
- How to run the app: `npm ci`, `npm run dev`, and `npm test`.
- A 3-line description of your app.

Your screenshots and answers go in the submission template, which you export as one PDF.

Questions? Email dmandloi@neiu.edu.

## Component Map

The Reading List application uses React components to organize the interface and manage the book collection.

### 1. App
- Responsibility: Main component that controls the application.
- State: items, search, filter.
- Props: None.
- Events: handleAddBook, handleRemoveBook, handleToggleRead.
- Owns the main application state.

### 2. Header
- Responsibility: Displays the application title and introduction.
- Props: None.
- Events: None.
- State: None.

### 3. StatusMessage
- Responsibility: Displays the number of books in the collection.
- Props: count.
- Events: None.
- State: None.

### 4. ItemForm
- Responsibility: Allows users to add books.
- Props: onAdd.
- State: title, creator, error.
- Events: handleSubmit.
- Validates required fields before adding a book.

### 5. CollectionControls
- Responsibility: Provides search and reading status filters.
- Props: search, setSearch, filter, setFilter.
- Events: Updates search and filter values.
- State: Managed by App.

### 6. ItemCard
- Responsibility: Displays an individual book and its actions.
- Props: book, onRemove, onToggleRead.
- Events: Remove book and change reading status.
- State: Receives book information from App.

### 7. ItemList
- Responsibility: Displays the collection of book cards.
- Props: items, onRemove, onToggleRead.
- Events: Passes book actions to ItemCard.
- State: None.

### State Management

The App component owns the main book collection state. It passes information and callback functions to child components through props.

The ItemForm component manages its own input fields and validation messages using React useState.

Search and filter values are managed in App and passed to CollectionControls.

### Component Communication

1. App passes book information to ItemList.
2. ItemList creates individual ItemCard components.
3. ItemCard sends user actions back to App through callback functions.
4. ItemForm sends new book information to App.
5. App updates the collection and React displays the changes.

### Testing

The application includes seven automated tests using Vitest and React Testing Library. All seven tests passed during testing.
