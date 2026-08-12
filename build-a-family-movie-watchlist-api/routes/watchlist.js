import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  updateMovie,
} from "../utils/db.js";

const router = Router();

router.use(authenticate);

router.get("/:userId", (req, res) => {
  const watchlist = getWatchlist(Number(req.params.userId));
  res.status(200).json(watchlist);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
  const { title, genre } = req.body || {};
  const movie = addMovie(Number(req.params.userId), { title, genre });

  if (!movie) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(201).json(movie);
});

router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const updated = updateMovie(
      Number(req.params.userId),
      Number(req.params.movieId),
      req.body || {},
    );

    if (!updated) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.status(200).json(updated);
  },
);

router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const removed = deleteMovie(
      Number(req.params.userId),
      Number(req.params.movieId),
    );

    if (!removed) {
      return res.status(404).json({ error: "Movie not found." });
    }

    res.status(200).json({ success: true });
  },
);

export default router;