import { useState } from "react";
import { Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContex";
 

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        },
    },
});


const App = () => {

    const adoptedPet = useState(null);
    return (

    <BrowserRouter>

        <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
        <header> 
            <Link to="/">Adopt Me!</Link>
        </header>
   
        <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
        </AdoptedPetContext.Provider>
        </QueryClientProvider>
    </BrowserRouter>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
