import React, {useEffect, useState} from "react";
import {CircularProgress, List} from "@mui/material";
import {NavLink} from 'react-router-dom'
import classes from "./PokemonEvolutions.module.css";


export default function PokemonEvolutions(props) {
  const [loading, setLoading] = useState(true);
  const [speciesUrl, setSpeciesUrl] = useState('');
  const [evolutionChainBody, setEvolutionChainBody] = useState([]);
  const baseImgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

  const setLoadingToFalse = () => {
    setLoading(false)
  }

  const getEvolutions = function (url) {
    setLoading(true)
    let chainBody = []
    fetch(url)
      .then(res => res.json())
      .then(pokemonSpecies => {
        try {
          fetch(pokemonSpecies['evolution_chain']['url'])
            .then(chainRes => chainRes.json())
            .then(evolutionChain => {
              let splitUrl = evolutionChain['chain']['species']['url'].split('/')
              splitUrl = splitUrl[splitUrl.length - 2]
              chainBody.push(
                <NavLink to={`/pokemon/${splitUrl}`} key={splitUrl + '_link'}
                         style={{color: "inherit", textDecoration: "inherit"}}>
                  <div key={evolutionChain['chain']['species']['name'].toUpperCase() + '_div'}
                       style={{display: "inline-table"}}>
                    <img alt={evolutionChain['chain']['species']['name'].toUpperCase()}
                         src={baseImgUrl + splitUrl + '.png'} style={{width: '50px', height: '50px'}}/>
                    <p
                      style={{fontFamily: "'Flexo-Demi',arial,sans-serif"}}>{evolutionChain['chain']['species']['name'][0].toUpperCase()
                      + evolutionChain['chain']['species']['name'].slice(1,)}</p>
                  </div>
                </NavLink>)
              let evolvesTo = evolutionChain['chain']['evolves_to'][0]
              while (evolvesTo !== undefined) {
                splitUrl = evolvesTo['species']['url'].split('/')
                splitUrl = splitUrl[splitUrl.length - 2]

                chainBody.push(
                  <div key={'nextEvolution_' + splitUrl}
                       style={{display: "inline-table", alignContent: "center", minHeight: "80%", padding: "5%"}}>
                    &gt;
                  </div>
                )

                chainBody.push(
                  <NavLink to={`/pokemon/${splitUrl}`} key={splitUrl + '_link'}
                           style={{color: "inherit", textDecoration: "inherit"}}>
                    <div key={evolvesTo['species']['name'].toUpperCase() + '_div'}
                         style={{display: "inline-table", minHeight: "80%"}}>
                      <img key={evolvesTo['species']['name'].toUpperCase() + '_img'}
                           alt={evolvesTo['species']['name'].toUpperCase()}
                           src={baseImgUrl + splitUrl + '.png'} style={{width: '50px', height: '50px'}}/>
                      <p style={{fontFamily: "'Flexo-Demi',arial,sans-serif"}}
                         key={evolvesTo['species']['name'].toUpperCase() + '_value'}>
                        {evolvesTo['species']['name'][0].toUpperCase() + evolvesTo['species']['name'].slice(1,)}
                      </p>
                    </div>
                  </NavLink>
                )

                evolvesTo = evolvesTo['evolves_to'][0];
              }
              setEvolutionChainBody(
                <div key={'evolution_chain_body'}
                     style={{minHeight: "100%", alignContent: "center"}}>
                  {chainBody}
                </div>
              )
              setTimeout(setLoadingToFalse, 500)

            })
        } catch (e) {
          setEvolutionChainBody(
            <List key={'evolution_chain_body'}
                                      style={{minHeight: "100%", alignContent: "center"}}
            >
              No evolutions
            </List>
          )
          setTimeout(setLoadingToFalse, 500)
        }
      })

  }

  useEffect(() => {
    setLoading(true)
    setEvolutionChainBody('No evolutions')
    setSpeciesUrl(props.speciesUrl)
    if (props.speciesUrl !== '') {
      getEvolutions(props.speciesUrl);
    }

    return () => {
      setSpeciesUrl('');
    }
  }, [props.speciesUrl]);

  if (loading) {
    <CircularProgress
      key={'circularProgress'}
      style={{padding: "1%"}}
    />
  }

  return (
    <div key={'PokemonEvolutions'}
         className={"pokeEvolutions"}
         style={{marginTop: "5%"}}
    >
      <div key={'PokemonEvolutions_component'}
           className={'stat_box'}
           style={{display: "inline-block", minWidth: '90%'}}
      >
        <h4 style={{textAlign: 'left', paddingLeft: '5%'}}>Evolutions:</h4>

        <div key={'evolution_chain_body_div'}>
          {evolutionChainBody}
        </div>
      </div>
    </div>
  );
}