import React from 'react';

export default function PokemonImage(props){
  return (
    <div key={'pokeImage'} className={'pokeImage'}>
      <img alt={props.pokemon['name'][0].toUpperCase() + props.pokemon['name'].substring(1)}
           src={props.pokemon['sprites']['other']['official-artwork']['front_default']}
           style={{width: '200px', height: 'auto'}}/>
    </div>
  )
}