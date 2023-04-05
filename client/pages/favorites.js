import { useContext } from "react";
import Link from "next/link";

import Card from "../components/Card";

import FavsContext from "../contexts/favs";

export default function favorites() {
  const [favContent, setFavContent] = useContext(FavsContext);
  const noFavs = favContent.length < 1;
  return (
    <div className="container">
      {noFavs ? (
        "Your favorites list is empty."
      ) : (
        <div className="container">
          <div className="sup-title">Favorite Content</div>
          <div className="grid">
            {favContent &&
              favContent.map((e, i) => (
                <Card details={e} key={i} removeBtn={true} />
              ))}
          </div>
        </div>
      )}

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
