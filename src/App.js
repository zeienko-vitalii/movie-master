import { useState } from "react";

import "./App.css";

import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import Spinner from "./components/spinner/Spinner";

// c032e2d7
//c032e2d7-1e3e-4e3a-8f9e-3f3b7d3e3e3e

const API_URL = "http://www.omdbapi.com/?apikey=c032e2d7";

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");
	const searchMovies = async (title) => {
		setIsLoading(true);
		if (!title.length) {
			setIsLoading(false);
			return;
		}

		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
		setIsLoading(false);
	};

	const onSearchChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	return (
		<div className="app">
			<h1>MovieMaster</h1>

			<div className="search">
				<input
					placeholder="Search for movies"
					value={search}
					onChange={onSearchChange}
				/>

				<img
					src={SearchIcon}
					alt="Search"
					onClick={() => {
						searchMovies(search);
					}}
				/>
			</div>

			{isLoading ? (
				<Spinner />
			) : movies?.length > 0 ? (
				<div className="container">
					{movies.map((el) => (
						<MovieCard movie={el} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
