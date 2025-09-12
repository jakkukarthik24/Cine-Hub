import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../css/Movie.css";
import MovieCard from "../components/MovieCard.jsx";
import { API_KEY, BASE_URL } from "../services/api.js";
import { useMovieContext } from "../hooks/useMovieContext";

function Movie() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;
  const fromSearch = location.state?.fromSearch;
  const searchQuery = location.state?.searchQuery;
  const searchResults = location.state?.searchResults;
  if (!movie) {
    return (
      <div className="error">
        Movie not found.
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  useEffect(() => {
    if (!movie?.id) return;
    window.scrollTo(0, 0);
  }, [movie?.id]);

  const [similar, setSimilar] = useState([]);
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.title = `${movie?.title || "Movie"} | Cine Hub`;
    return () => {
      document.title = "Cine Hub";
    };
  }, [movie?.title]);

  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    isWatchListed,
    addToWatchList,
    removeFromWatchList,
  } = useMovieContext();

  const favorite = movie?.id ? isFavorite(movie.id) : false;
  const watchlisted = movie?.id ? isWatchListed(movie.id) : false;

  function handleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!movie?.id) return;
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function handleWatchList(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!movie?.id) return;
    if (watchlisted) removeFromWatchList(movie.id);
    else addToWatchList(movie);
  }

  useEffect(() => {
    if (!movie?.id) return;
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    fetchDetails();
  }, [movie?.id]);

  useEffect(() => {
    if (!movie?.id) return;
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        const data = await response.json();
        const trailer = data.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.log("Error finding trailer");
      }
    };
    fetchTrailer();
  }, [movie?.id]);

  useEffect(() => {
    if (!movie?.id) return;
    const fetchSimilar = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movie.id}/similar?api_key=${API_KEY}`
        );
        const data = await response.json();
        setSimilar(data.results ? data.results.slice(0, 6) : []);
      } catch (err) {
        console.log("Error finding similar movies");
      }
    };
    fetchSimilar();
  }, [movie?.id]);

  useEffect(() => {
    if (!movie?.id) return;
    const fetchComments = async () => {
      try {
        const result = await fetch(
          `https://cine-hub.onrender.com/api/comments/${movie.id}`
        );
        const data = await result.json();
        setComments(data || []);
      } catch (err) {
        console.log("Error fetching comments");
      }
    };
    fetchComments();
  }, [movie?.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Login to add comments");
      navigate("/login");
      return;
    }
    if (newComment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        "https://cine-hub.onrender.com/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            movieId: movie.id,
            comment: newComment,
          }),
        }
      );
      const data = await response.json();
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.log("Error adding comment");
    }
  };

  const handleEditStart = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.comment);
  };

  const handleEditSave = async (commentId) => {
    if (editCommentText.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `https://cine-hub.onrender.com/api/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: editCommentText,
          }),
        }
      );
      const data = await response.json();
      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? data : comment))
      );
      setEditCommentId(null);
      setEditCommentText("");
    } catch (err) {
      console.log("Error editing comment");
    }
  };

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the comment?"
    );
    if (!confirmDelete) return;
    try {
      await fetch(`https://cine-hub.onrender.com/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComments((p) => p.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.log("Error deleting comment");
    }
  };

  return (
    <>
      <div className="movie-detail">
        <div className="movie-image">
          {fromSearch && (
            <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          )}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title || "Movie"}
          />
          <br />
          <div className="movie-actions">
            <button
              className={`wat-btn ${watchlisted ? "active" : ""}`}
              onClick={handleWatchList}
              title="watchlist"
            >
              ★
            </button>
            <button
              className={`f-btn ${favorite ? "active" : ""}`}
              id="fav"
              onClick={handleFavorite}
              title="favorite"
            >
              ♥
            </button>
          </div>
        </div>

        <div className="movie-data">
          <div className="movie-title">
            <h1>{movie.title || "Untitled"}</h1>
          </div>
          <br />
          <h2>Overview</h2>
          <p>{movie.overview || "No overview available."}</p>
          <br />
          <p>
            <span className="info">Release Date : </span>{" "}
            {movie.release_date || "N/A"}
          </p>
          {details && (
            <>
              <p>
                <span className="info">Genres:</span>{" "}
                {details.genres
                  ? details.genres.map((g) => g.name).join(", ")
                  : "N/A"}
              </p>
              <p>
                <span className="info">Runtime:</span>{" "}
                {details.runtime ? `${details.runtime} minutes` : "N/A"}
              </p>
              <p>
                <span className="info">Rating:</span>{" "}
                {details.vote_average
                  ? `${details.vote_average.toFixed(1)} / 10`
                  : "N/A"}
              </p>
              {details.budget > 0 && (
                <p>
                  <span className="info">Budget:</span>{" "}
                  ${details.budget.toLocaleString()}
                </p>
              )}
              {details.revenue > 0 && (
                <p>
                  <span className="info">Revenue:</span>{" "}
                  ${details.revenue.toLocaleString()}
                </p>
              )}
            </>
          )}

          <br />
          <h3 className="trailer">Trailer</h3>
          {trailerKey ? (
            <div className="trailer-container">
              <iframe
                loading="lazy"
                height="320"
                width="560"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${movie.title || "Movie"} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>Trailer Unavailable</p>
          )}
        </div>
      </div>

      <div className="similar">
        {similar.length > 0 && <h2 className="similar-heading">Similar Movies</h2>}
        <div className="similar-movies">
          {similar.length > 0 ? (
            similar.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p>No similar movies found.</p>
          )}
        </div>
      </div>

      <div className="comment-section">
        <h2 className="comment-heading">Comments</h2>
        {user ? (
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              rows={2}
              required
              className="comment-input"
              maxLength={300}
              enterKeyHint="done"
            />
            <button type="submit" className="comment-btn">
              Submit
            </button>
          </form>
        ) : (
          <p>Login to add a comment</p>
        )}
        {comments.length > 0 ? (
          <div>
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <strong className="comment-user">
                  {comment.user_email || "Anonymous"}
                </strong>
                {editCommentId === comment.id ? (
                  <div className="comment-edit">
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      maxLength={300}
                      rows={2}
                    />
                    <div className="comment-actions">
                      <button id="edit-save" onClick={() => handleEditSave(comment.id)}>
                        Save
                      </button>
                      <button onClick={() => setEditCommentId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="comment-content">
                    <div>
                      <p>{comment.comment}</p>
                      <small className="comment-time">
                        {comment.created_at
                          ? new Date(comment.created_at).toLocaleString()
                          : ""}
                      </small>
                    </div>
                    {user && comment.user_id === user.id && (
                      <div className="comment-actions">
                        <button onClick={() => handleEditStart(comment)}>Edit</button>
                        <button onClick={() => handleDelete(comment.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </>
  );
}

export default Movie;
