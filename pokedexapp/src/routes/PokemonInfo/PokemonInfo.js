import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, CircularProgress} from "@mui/material";
import classes from "./PokemonInfo.module.css";
import PokemonPanel from '../../components/PokemonPanel/PokemonPanel';
import ManagementPanel from '../../components/ManagementPanel/ManagementPanel';

//TODO 1. MOVE STYLES INTO CLASSES
//TODO 2. USE CSS MODULES
//TODO 3. BETTER MANAGE ITEM NESTING

export default function PokemonInfo() {
  const params = useParams();
  //const pokedexId = params.pokemon;
  //const [pokedexId, setPokedexId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(0);
  const [typeList, setTypeList] = useState([]);
  const [statList, setStatList] = useState([]);
  const [speciesUrl, setSpeciesUrl] = useState([]);
  const [encountersUrl, setEncountersUrl] = useState([]);

  const setLoadingToFalse = () => {
    setLoading(false)
  }

  function getData(pokedexIdentifier) {
    setLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokedexIdentifier)
      .then(res => res.json())
      .then(pokemonsJson => {
        let type = [];
        let stat = [];
        pokemonsJson['types'].map((key) => {
          type.push(key['type']['name'])
        })
        setTypeList(type)
        pokemonsJson['stats'].map((key) => {
          stat.push([key['stat']['name'], key['base_stat']])
        })
        setStatList(stat)
        setSpeciesUrl(pokemonsJson['species']['url'])
        setEncountersUrl(pokemonsJson['location_area_encounters'])
        setPokemon(pokemonsJson)
        setTimeout(setLoadingToFalse, 300)
      })
  }

  useEffect(() => {
    setLoading(true)
    setPokemon(null);
    setStatList(null)
    setSpeciesUrl('')
    setEncountersUrl('')
    if (params.pokemon) {
      getData(params.pokemon);
    }

    return () => {
      params.pokemon = null;
    }
  }, [params.pokemon]);
  //getData();

  if (loading) {
    return (
      <CircularProgress key={'CircularProgress'}
                        style={{padding: "1%", alignSelf: "center", textAlign: "center", margin: "0 auto"}}/>
    )
  }

  return (
    <main style={{padding: "1rem 0", justifyContent: 'center', position: "relative", width: '100%'}}>

      <ManagementPanel
        pokemon={pokemon}
      />

      <PokemonPanel
        pokemon={pokemon}
        statList={statList}
        typeList={typeList}
        speciesUrl={speciesUrl}
        encountersUrl={encountersUrl}
      />

    </main>
  );
};