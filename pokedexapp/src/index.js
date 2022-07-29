import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import PokemonInfo from "./routes/PokemonInfo/PokemonInfo";

ReactDOM.render(
    <BrowserRouter>
        {/*<nav style={{textAlign: "center", fontSize: '50px'}}>POKEDEX</nav>*/}
        <Routes key={'Routes'}>
            <Route key={'main_route'} path="/" element={<App />}>
                <Route key={'Route_pokemon'} path="/pokemon" element={<PokemonInfo />} >
                    <Route key={'Route_pokemon_id'} path=":pokemon" element={<PokemonInfo />} />
                </Route>
            </Route>
        </Routes>
        <div style={{clear: "both"}}/>
        <footer>Bartosz Wiecheć, 2022</footer>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
