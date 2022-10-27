import React from 'react';
import PokemonType from './PokemonType/PokemonType';
import PokemonStats from "./PokemonStats/PokemonStats";

export default function PokemonBasicInfo(props) {
  return (
    <div
      key={'pokeStats'}
      className={"pokeStats"}
      style={{marginTop: "5%"}}>

      <PokemonStats statList={props?.statList}/>

      <PokemonType typeList={props?.typeList}/>

    </div>
  )
}