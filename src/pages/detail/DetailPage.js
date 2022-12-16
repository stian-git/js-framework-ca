import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { apiBaseUrl, apiKey } from "../../constants/Variables";
import useLocalStorage from "../../hooks/useLocalStorage";

function DetailPage() {
    const [game, setGame] = useState({});
    const [favourite, setFavourite] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    let [allFavourites, setAllFavourites] = useLocalStorage("favs", []);
    const { id } = useParams();

    useEffect(() => {
        let gameDetails = {};
        const url = apiBaseUrl + "games/" + id + "?key=" + apiKey;
        async function getGame() {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    gameDetails = response.data;
                }
            } catch (e) {
                setError("Something went wrong. Please try to reload the page. (Error: " + e.response.status.toString() + ")");
            } finally {
                setGame(gameDetails);
                setLoading(false);
            }
            // Check if game is a favourite.
            const gameIsFavourite = allFavourites.find((game) => game.id === id.toString());
            if (gameIsFavourite) {
                setFavourite(true);
            }
        }
        getGame();
    }, [allFavourites, id]);

    function addFavourite(e) {
        const gameId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        const gameName = e.target.parentElement.parentElement.parentElement.parentElement.dataset.name;
        const gameReleased = e.target.parentElement.parentElement.parentElement.parentElement.dataset.released;
        const game = { id: gameId, name: gameName, released: gameReleased };
        setAllFavourites((allFavourites) => [...allFavourites, game]);
        setFavourite(true);
    }

    function removeFavourite(e) {
        const gameId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        allFavourites = allFavourites.filter((game) => game.id !== gameId);
        setAllFavourites(allFavourites);
        setFavourite(false);
    }

    if (loading) {
        return <div>Loading game details...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Header text={game.name} />
            <div className="gamedetails" data-id={game.id} data-released={game.released} data-name={game.name}>
                <img className="gamedetails__image" src={game.background_image} alt={`Game: ${game.name}`} />
                <Row className="justify-content-md-center">
                    <Col xs={10}>
                        <Header className="gamedetails__reating" size="5" text={`Rating score: ${game.rating}`} />
                        <Header className="gamedetails__released" size="5" text={`Released: ${game.released}`} />
                    </Col>
                    <Col>
                        <Header size="2" className="gamedetails__favourite" text={""}>
                            {favourite ? <i className="fa-solid fa-heart hearticon" onClick={removeFavourite}></i> : <i className="fa-regular fa-heart hearticon" onClick={addFavourite}></i>}
                        </Header>
                    </Col>
                </Row>
                <div className="gamedetails__description" dangerouslySetInnerHTML={{ __html: game.description }}></div>
            </div>
        </>
    );
}

export default DetailPage;
