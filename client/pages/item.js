import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Card from "../components/Card";

import FavsContext from "../contexts/favs";
import AuthContext from "../contexts/auth";

import tmdbService from "../services/tmdbApi";

export default function item() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isMovie = searchParams.get("isMovie") === "true";
  const [details, setDetails] = useState({});
  const [favContent, setFavContent] = useContext(FavsContext);
  const [session, setSession] = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const response = await tmdbService.getDetails(id, isMovie, session);
      setDetails(response);
    }
    fetchData();
  }, []);

  if (!details || !details.credits) return "Loading ...";

  const { overview, credits } = details;

  const { cast } = credits;
  console.log(details.id);
  console.log(favContent);
  const disabled = favContent.findIndex((e) => e.id === details.id) !== -1;
  console.log(disabled);
  return (
    <div className="container">
      <Card details={details} removeBtn={false} />
      <h5>Overview:</h5>
      <p className="text-break">{overview}</p>

      <h5>Casting:</h5>
      <p className="text-break">
        {cast.reduce((acc, prev) => (acc += `, ${prev.name}`), cast[0].name)}
      </p>

      <button
        type="button"
        className="btn btn-info"
        onClick={() => {
          const newFavs = [...favContent];
          newFavs.push(details);
          setFavContent(newFavs);
        }}
        disabled={disabled}
      >
        Add to favorites
      </button>
      <Link
        className="btn btn-secondary"
        href={{
          pathname: "/",
          query: {},
        }}
      >
        return
      </Link>
    </div>
  );
}
