import Card from "./Card";

export default function Grid({ movies, shows }) {
  return (
    <div className="grid">
      <div className="sup-title">Popular Movies</div>
      <div className="sup-title">Popular Shows</div>
      <div className="column">
        {movies && movies.map((e, i) => <Card details={e} key={i} />)}
      </div>
      <div className="column">
        {shows && shows.map((e, i) => <Card details={e} key={i} />)}
      </div>
    </div>
  );
}
