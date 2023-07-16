import { Suspense, lazy } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Loader from "./Loader/Loader";

const HomePage = lazy(() => import('pages/HomePage'));
const SearchPage = lazy(() => import('pages/SearchPage'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));

export const App = () => {
    return(
        <div>
            <header>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/search">Seach</NavLink>
                </nav>
            </header>
            <main>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/search" element={<SearchPage/>}/> 
                        <Route path="/movie/:movieId/*" element={<MovieDetails/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
};
