const getState = ({ getStore, setStore }) => {
	return {
		store: {
			favorites: [],
			data: { results: [] },
			category: "people",
			infoMapping: {
				people: [
					{ label: "Name", key: "name" },
					{ label: "Height", key: "height" },
					{ label: "Mass", key: "mass" },
					{ label: "Hair Color", key: "hair_color" },
					{ label: "Eye Color", key: "eye_color" },
					{ label: "Gender", key: "gender" },
				],

				species: [
					{ label: "Name", key: "name" },
					{ label: "Classification", key: "classification" },
					{ label: "Designation", key: "designation" },
					{ label: "Average Height", key: "average_height" },
					{ label: "Skin Colors", key: "skin_colors" },
					{ label: "Language", key: "language" },
				],

				starships: [
					{ label: "Name", key: "name" },
					{ label: "Model", key: "model" },
					{ label: "Manufacturer", key: "manufacturer" },
					{ label: "Cost", key: "cost_in_credits" },
					{ label: "Length", key: "length" },
					{ label: "Crew", key: "crew" },
				],

				vehicles: [
					{ label: "Name", key: "name" },
					{ label: "Model", key: "model" },
					{ label: "Manufacturer", key: "manufacturer" },
					{ label: "Cost", key: "cost_in_credits" },
					{ label: "Length", key: "length" },
					{ label: "Crew", key: "crew" },
				],

				planets: [
					{ label: "Name", key: "name" },
					{ label: "Climate", key: "climate" },
					{ label: "Diameter", key: "diameter" },
					{ label: "Gravity", key: "gravity" },
					{ label: "Population", key: "population" },
					{ label: "Terrain", key: "terrain" },
				],

				films: [
					{ label: "Title", key: "title" },
					{ label: "Director", key: "director" },
					{ label: "Producer", key: "producer" },
					{ label: "Release Date", key: "release_date" },
					{ label: "Opening Crawl", key: "opening_crawl" },
				],
			},
		},
		actions: {
			handleFavorite: (name) => {
				const store = getStore();
				const newFavorites = store.favorites.includes(name)
					? store.favorites.filter((favorite) => favorite !== name)
					: [...store.favorites, name];

				alert(
					store.favorites.includes(name)
						? `${name} ha sido eliminado de favoritos.`
						: `${name} ha sido añadido a favoritos.`
				);

				setStore({ favorites: newFavorites });
			},

			fetchData: (endpoint) => {
				fetch(`https://swapi.tech/api/${endpoint}`)
					.then((response) => response.json())
					.then((data) => {
						const results = endpoint === "films" ? data.result : data.results || [];
						setStore({ data: { results }, category: endpoint });
					})
					.catch((err) => console.error(err));
			},
		},
	};
};

export default getState;
