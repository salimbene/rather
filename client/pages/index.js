import { Fragment, useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import Grid from "../components/Grid";
import SearchBar from "../components/SearchBar";
import Login from "../components/Login";
import Message from "../components/Message";
import AuthContext from "../contexts/auth";

import tmdbService from "../services/tmdbApi";

export async function getStaticProps() {
  const response = await tmdbService.getContent();
  const { popularMovies, popularShows } = response;
  return {
    props: { popularMovies, popularShows }, // will be passed to the page component as props
  };
}

export default function IndexPage({ popularMovies, popularShows }) {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [filter, setFilter] = useState("");
  const [session, setSession] = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setMovies(popularMovies);
    setShows(popularShows);
  }, []);

  const onChange = async (e) => {
    const { value } = e.target;
    setFilter(value);

    // if no filter, reset content
    const data = !value
      ? await tmdbService.getContent()
      : await tmdbService.filter(value, session);

    const { searchMovie, searchShow } = data;
    const { popularMovies, popularShows } = data;
    setMovies(searchMovie || popularMovies);
    setShows(searchShow || popularShows);
  };

  if (!movies || !shows) return <div>Loading...</div>;
  const { token, isAdmin } = session;
  return (
    <Fragment>
      <Head>
        <title>Rather Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Message token={token} isAdmin={isAdmin} />
      <span className="badge bg-info text-dark">{`Signed as ${
        isAdmin ? "admin" : "user"
      }`}</span>

      <div className="container">
        <div className="top">
          <Link
            className="btn btn-light"
            href={{
              pathname: "/favorites",
              query: {},
            }}
          >
            Favorites
          </Link>
          <SearchBar onChange={onChange} value={filter} disabled={!token} />

          <button
            type="button"
            className="btn btn-info"
            onClick={() => setShowLogin(true)}
          >
            {token ? "Change User" : "Sign In"}
          </button>
        </div>
        <Grid movies={movies} shows={shows} />
      </div>
      <Login onClose={() => setShowLogin(false)} show={showLogin} />
    </Fragment>
  );
}
