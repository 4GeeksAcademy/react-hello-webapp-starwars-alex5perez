import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-info">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          INICIO
        </Link>
        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favoritos ({store.favorites?.length || 0})
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {store.favorites?.length === 0 ? (
                <li className="dropdown-item">No hay favoritos</li>
              ) : (
                store.favorites.map((fav, index) => (
                  <li key={index} className="dropdown-item">
                    {fav}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
