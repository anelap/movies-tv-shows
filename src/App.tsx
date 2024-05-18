import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes";
import { SearchContextProvider } from "./context/SearchContext";


function App() {
  return (
    <SearchContextProvider>
      <RouterProvider router={appRouter} />
    </SearchContextProvider>
  );
}

export default App;
