import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiBaseUrl, apiKey } from "../../constants/Variables";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    let [favourites, setFavourites] = useLocalStorage("favs", []);

    useEffect(() => {
        async function getGames() {
            const url = apiBaseUrl + "games?page=1&page_size=10&publishers=electronic-arts&key=" + apiKey;
            let games = [];
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    games = response.data.results;
                }
            } catch (e) {
                setError(e.message.toString() + ". Please try to reload the page.");
            } finally {
                setGames(games);
                setLoading(false);
            }
        }
        getGames();
    }, []);

    function addFavourite(e) {
        const gameId = e.target.parentElement.dataset.id;
        const gameName = e.target.parentElement.dataset.name;
        const gameReleased = e.target.parentElement.dataset.released;
        const game = { id: gameId, name: gameName, released: gameReleased };
        setFavourites((favourites) => [...favourites, game]);
    }

    function removeFavourite(e) {
        const gameId = e.target.parentElement.dataset.id;
        favourites = favourites.filter((game) => game.id !== gameId);
        setFavourites(favourites);
    }

    function gameIsFavourite(id) {
        return favourites.find((game) => game.id === id.toString());
    }

    if (loading) {
        return <div>Loading games...</div>;
    }
    if (error) {
        return <div>An error occured: {error.toString()}</div>;
    }

    const isEmpty = games.length === 0;
    return (
        <>
            {isEmpty ? (
                <p>There are no games to display.</p>
            ) : (
                <ListGroup as="ul">
                    {games.map((game) => (
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={game.id} data-id={game.id} data-released={game.released} data-name={game.name}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    <Link to={`/detail/${game.id}`}>{game.name}</Link>
                                </div>
                                Released: {game.released}
                            </div>
                            {gameIsFavourite(game.id) ? <i className="fa-solid fa-heart hearticon" onClick={removeFavourite}></i> : <i className="fa-regular fa-heart hearticon" onClick={addFavourite}></i>}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
}
