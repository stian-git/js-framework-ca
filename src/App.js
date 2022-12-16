import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import { LoginProvider } from "./context/LoginContext";
import HomePage from "./pages/home/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import ContactPage from "./pages/contact/ContactPage";
import LoginPage from "./pages/login/LoginPage";
import DetailPage from "./pages/detail/DetailPage";
import FavouritesPage from "./pages/favourites/FavouritesPage";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import ErrorPage from "./pages/error/ErrorPage";

function App() {
    return (
        <LoginProvider>
            <BrowserRouter>
                <Container fluid="sm" as="main" className="main__wrapper">
                    <Row className="main__wrapper-center">
                        <Col md={12} lg={10}>
                            <Navigation />
                        </Col>
                    </Row>
                    <Row className="main__wrapper-center">
                        <Col md={12} lg={10} xl={8} xxl={7}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/favourites" element={<FavouritesPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path={`/detail/:id`} element={<DetailPage />} />
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="*" element={<ErrorPage />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </BrowserRouter>
        </LoginProvider>
    );
}

export default App;
