import React from 'react'
import PokemonEvolutions from "./PokemonEvolutions/PokemonEvolutions";
import PokemonEncounters from "./PokemonEncounters/PokemonEncounters";
import PokemonBasicInfo from "./PokemonBasicInfo/PokemonBasicInfo";
import PokemonImage from "./PokemonImage/PokemonImage";

export default function PokemonPanel(props){
  return (
    <div
      key={'poke_panel'}
      style={{display: "inline-block", minWidth: '90%'}}
    >

      <PokemonImage pokemon={props.pokemon}/>

      <PokemonBasicInfo statList={props.statList} typeList={props.typeList}/>

      <PokemonEvolutions speciesUrl={props.speciesUrl}/>

      <PokemonEncounters encountersUrl={props.encountersUrl}/>

    </div>
  )
}