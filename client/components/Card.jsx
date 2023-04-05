import { useContext } from "react";
import Link from "next/link";

import FavsContext from "../contexts/favs";
import AuthContext from "../contexts/auth";

import config from "../config.json";
const { TMDB_IMG_BASE_URL } = config;

export default function Card({ details, removeBtn }) {
  const [favContent, setFavContent] = useContext(FavsContext);
  const [session, setSession] = useContext(AuthContext);

  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = details;

  const isMovie = !!title;
  const { isAdmin } = session;
  return (
    <div className="card">
      <div>
        <Link
          href={{
            pathname: isAdmin ? "/item" : "",
            query: {
              id,
              isMovie,
            },
          }}
        >
          <img
            src={`${TMDB_IMG_BASE_URL}/${poster_path}`}
            alt={title || name}
          />
        </Link>
      </div>
      <h3>{title || name}</h3>
      <h6>
        relase:
        <span className="badge bg-light text-dark">
          {release_date || first_air_date}
        </span>
      </h6>
      <h6>
        rating:
        <span className="badge bg-light text-dark">{vote_average}</span>
      </h6>
      {removeBtn && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            const newFavs = favContent.filter((e) => e.id !== id);
            setFavContent(newFavs);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}
