import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./components/AppContainer/AppContainer";
import MovieDetails from "./components/Movies/MovieDetails";
import ShowDetails from "./components/Shows/ShowDetails";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppContainer />
    },
    {
        path: '/movie/:id',
        element: <MovieDetails />
    },
    {
        path: '/tv/:id',
        element: <ShowDetails />
    }
])