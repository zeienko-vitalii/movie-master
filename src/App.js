import { useState } from "react";

import "./App.css";

import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import Spinner from "./components/spinner/Spinner";

//c032e2d7-1e3e-4e3a-8f9e-3f3b7d3e3e3e

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");

	const searchMovies = async (title) => {
		try {
			setIsLoading(true);
			if (!title.length) {
				setIsLoading(false);
				return;
			}

			const url = `${process.env.REACT_APP_OMDB_API_URL}&s=${title}`;

			const response = await fetch(url);
			const data = await response.json();
			setMovies(data.Search);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
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
						<MovieCard key={el.Title || "movie"} movie={el} />
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
