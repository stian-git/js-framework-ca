import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function FavouritesPage() {
    let [allFavourites, setAllFavourites] = useLocalStorage("favs", []);

    function removeFavourite(e) {
        const gameId = e.target.parentElement.dataset.id;
        allFavourites = allFavourites.filter((game) => game.id !== gameId);
        setAllFavourites(allFavourites);
    }
    const isEmpty = allFavourites.length === 0;

    return (
        <>
            <Header text="Favourites" />
            {isEmpty ? (
                <p>There are no favourites selected.</p>
            ) : (
                <ListGroup as="ul">
                    {allFavourites.map((game) => (
                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={game.id} data-id={game.id} data-released={game.released} data-name={game.name}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    <Link to={`/detail/${game.id}`}>{game.name}</Link>
                                </div>
                                Released: {game.released}
                            </div>
                            <i className="fa-solid fa-heart hearticon" onClick={removeFavourite}></i>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
}
