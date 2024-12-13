import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const { data, category, favorites } = store;

  const getImageUrl = (id, category) =>
    category === "people"
      ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
      : `https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`;

  return (
    <div className="container-fluid bg-dark text-light pt-5">
      <div className="row">
        <div className="col-md-2">
          <h5>BROWSE</h5>
          <div onClick={() => actions.fetchData("people")} style={{ cursor: "pointer" }}>
            PEOPLE
          </div>
          <div onClick={() => actions.fetchData("species")} style={{ cursor: "pointer" }}>
            SPECIES
          </div>
          <div onClick={() => actions.fetchData("starships")} style={{ cursor: "pointer" }}>
            STARSHIPS
          </div>
          <div onClick={() => actions.fetchData("vehicles")} style={{ cursor: "pointer" }}>
            VEHICLES
          </div>
          <div onClick={() => actions.fetchData("planets")} style={{ cursor: "pointer" }}>
            PLANETS
          </div>
          <div onClick={() => actions.fetchData("films")} style={{ cursor: "pointer" }}>
            FILMS
          </div>
        </div>

        <div className="col-md-10" style={{ paddingBottom: "100px" }}>
          <h4>Results</h4>
          <div className="row">
            {data.results.map((item, index) => {
              const id = category === "films" ? item.uid : item.url?.split("/")[5];
              const imageUrl = getImageUrl(id, category);

              return (
                <div key={index} className="col-6 col-md-4 col-lg-3 my-3">
                  <div className="text-center">
                    <button
                      onClick={() =>
                        actions.handleFavorite(
                          item.properties?.title || item.name || item.title
                        )
                      }
                      className="heart-icon"
                      style={{
                        fontSize: "40px",
                        color: favorites.includes(item.properties?.title || item.name || item.title) ? "red" : "grey",
                        cursor: "pointer", marginLeft: "8px", background: "none", border: "none", padding: "0", outline: "none",
                      }}>
                      ♥
                    </button>
                    <h5 className="mt-2">
                      {item.properties?.title || item.name || item.title}
                    </h5>
                    <Link to={`/single/${category}/${id}`}>
                      <img src={imageUrl}
                        alt={item.properties?.title || item.name || item.title}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src =
                            "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}
                        style={{
                          width: "200px", height: "200px", border: "2px solid white", borderRadius: "5px",
                          objectFit: "cover", cursor: "pointer",
                        }} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
