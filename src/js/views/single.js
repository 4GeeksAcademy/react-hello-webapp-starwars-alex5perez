import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Single = () => {
  const { theid, category } = useParams();
  const [card, setCard] = useState(null);
  const { store } = useContext(Context);
  const { infoMapping } = store;
  const details = infoMapping[category] || [];

  useEffect(() => {
    fetch(`https://swapi.tech/api/${category}/${theid}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not Found");
        }
        return response.json();
      })
      .then((data) => {
        setCard(data.result.properties);
      })
      .catch((err) => console.error(err));
  }, [theid, category]);

  const getImageUrl = (id, category) => {
    return category === "people"
      ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
      : `https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`;
  };

  if (!card) {
    return <h1>Loading...</h1>;
  }

  const imageUrl = getImageUrl(theid, category);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center">{card.name || card.title}</h2>
          <img
            src={imageUrl}
            alt={card.name || card.title}
            style={{
              width: "100%",
              height: "300px",
              border: "2px solid white",
              borderRadius: "10px",
              objectFit: "contain",
            }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
          <div className="row mt-4 text-center">
            <div className="col-12">
              <h4>Details</h4>
              <div className="row">
                {details.map((detail, index) => (
                  <div key={index} className="col-6">
                    <strong>{detail.label}:</strong> {card[detail.key] || "N/A"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
