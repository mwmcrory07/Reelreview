# Film Review Website

A website where users can browse films and reviews, add new films, and write their own reviews. The server is built with Node.js and Express and exposes a REST API, which the browser calls using `fetch`. Films and reviews are stored as JSON.

## Install and run

```bash
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## API

| Method | Endpoint | What it does |
| --- | --- | --- |
| GET | `/films/all` | Returns all films |
| GET | `/reviews/all` | Returns all reviews |
| GET | `/reviews/last/:film` | Returns the latest review for a film |
| POST | `/films/new` | Adds a new film (validated) |
| POST | `/review/new` | Adds a new review (validated) |
| POST | `/films/update` | Updates a film's average rating |
