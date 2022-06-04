import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import {trackPromise} from "react-promise-tracker";
import {Spinner} from "../../spinner";
import {Button, CircularProgress} from "@mui/material";
import PokemonType from '../../components/PokemonType/PokemonType'
import PokemonStats from "../../components/PokemonStats/PokemonStats";
import PokemonEvolutions from "../../components/PokemonEvolutions/PokemonEvolutions";
import PokemonEncounters from "../../components/PokemonEncounters/PokemonEncounters";

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

    const setLoadingToFalse = () =>{
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
            if(params.pokemon) {
                getData(params.pokemon);
            }
    }, [params.pokemon]);
    //getData();

    return (
        !loading ? <main style={{padding: "1rem 0", justifyContent: 'center', border: '1px solid black', width: '100%'}}>
            <div key={'management_panel'} className={'pokeManagementPanel'} style={{justifyContent: 'center'}}>
                <div className={'prevButton'} style={{ fontSize: "40px", maxWidth: "20%", float: "left", marginLeft: "5%", justifyContent: 'center'}}>
                    <Button variant="contained"  size="medium">&larr; Previous</Button>
                </div>

                <h1 className={'pokeList'} style={{display: "inline-flex"}}>
                    {pokemon['name'][0].toUpperCase() + pokemon['name'].substring(1)}
                </h1>

                <div className={'nextButton'} style={{ fontSize: "40px", maxWidth: "20%", float: "right", marginRight: "5%"}}>
                    <Button variant="contained" size="medium">Next &rarr;</Button>
                </div>
            </div>

            <div key={'poke_panel'} style={{display: "inline-block", minWidth: '90%'}}>

                <div key={'pokeImage'} className={'pokeImage'}>
                    <img alt={pokemon['name'][0].toUpperCase() + pokemon['name'].substring(1)}
                     src={pokemon['sprites']['other']['official-artwork']['front_default']} style={{width:'200px', height: 'auto'}}/>
                </div>

                <div key={'pokeStats'} className={"pokeStats"} style={{marginTop: "5%"}}>
                    <div key={'pokeStats_component'} style={{display: "inline-table", width: '45%', borderStyle: 'solid'}}>
                        <PokemonStats statList={statList}/>
                    </div>
                    <div key={'PokemonType_component'} style={{display: "inline-table", marginLeft: "5%", width: '45%', borderStyle: 'solid'}}>
                        <PokemonType typeList={typeList}/>
                        <p>
                            Weaknesses goes here <br/>
                            Hope so..
                        </p>
                    </div>
                </div>

                <div key={'PokemonEvolutions'} className={"pokeEvolutions"} style={{marginTop: "5%"}}>
                    <div key={'PokemonEvolutions_component'} style={{display: "inline-block", minWidth: '90%', borderStyle: 'solid'}}>
                        <h4 style={{textAlign:'left', paddingLeft: '5%'}}>Evolutions:</h4>
                        <PokemonEvolutions speciesUrl={speciesUrl}/>
                    </div>
                </div>

                <div key={'PokemonEncounters'} className={"pokeEncounters"} style={{marginTop: "5%"}}>
                    <div key={'PokemonEncounters_component'} style={{display: "inline-block", minWidth: '90%', borderStyle: 'solid'}}>
                        <h4 style={{textAlign:'left', paddingLeft: '2%'}}>Encounters:</h4>
                        <PokemonEncounters encountersUrl={encountersUrl}/>
                    </div>
                </div>
            </div>
        </main>
            :
            <CircularProgress key={'CircularProgress'} style={{padding:"1%", alignSelf: "center", textAlign: "center", margin: "0 auto"}}/>
    );
};