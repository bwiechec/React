import React from 'react';
import {Button, CircularProgress} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";

export default function ManagementPanel(props){
  const params = useParams();

  return (
    <div key={'management_panel'} className={'pokeManagementPanel'}
         style={{justifyContent: 'center', backgroundColor: "#f2f2f2", position: 'sticky', top: '0', zIndex: '1234'}}>

      {params.pokemon !== '1' &&
        <div className={'prevButton'}
             style={{fontSize: "40px", maxWidth: "20%", float: "left", marginLeft: "5%", justifyContent: 'center'}}>
            <NavLink to={`/pokemon/${parseInt(params.pokemon) - 1}`} style={{textDecoration: 'none'}}>
              <Button variant="contained" size="medium">&larr; Previous</Button>
            </NavLink>
        </div>
      }

      <h1 className={'pokeList'} style={{display: "inline-flex", fontFamily: "'Flexo-Demi',arial,sans-serif"}}>
        {props.pokemon['name'][0].toUpperCase() + props.pokemon['name'].substring(1)}
      </h1>

      {params.pokemon !== 10249 &&
        <div className={'nextButton'} style={{fontSize: "40px", maxWidth: "20%", float: "right", marginRight: "5%"}}>
          <NavLink to={`/pokemon/${parseInt(params.pokemon) + 1}`} style={{textDecoration: 'none'}}>
            <Button variant="contained" size="medium">Next &rarr;</Button>
          </NavLink>
        </div>
      }



    </div>
  )
}