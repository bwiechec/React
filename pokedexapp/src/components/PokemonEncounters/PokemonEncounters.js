import React, {useState, useEffect} from "react";
import {CircularProgress, List, ListItem, ListItemButton, Box} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import classes from "./PokemonEncounters.module.css";


export default function PokemonEncounters(props) {
    const [loading, setLoading] = useState(true);
    const [encountersUrl, setEncountersUrl] = useState('');
    const [encounterChainBody, setEncounterChainBody] = useState(<div></div>);

    const setLoadingToFalse = () =>{
        setLoading(false)
    }

    const getEncounters = (url) => {
        setLoading(true)
        let encounterBody = []
        fetch(url)
            .then(res => res.json())
            .then(pokemonEncounter => {
                pokemonEncounter.map((area)=>{
                    encounterBody.push(
                        <ListItem  key={area['location_area']['name']} component="div" disablePadding>
                            <ListItemButton key={area['location_area']['name']} >
                                <ListItemText primary={area['location_area']['name'].replace('-area', '').replaceAll('-', ' ')[0].toUpperCase()
                                + area['location_area']['name'].replace('-area', '').replaceAll('-', ' ').slice(1,)}  key={area['location_area']['name']} />
                            </ListItemButton>
                        </ListItem>)
                })
                if(pokemonEncounter.length){
                    setEncounterChainBody(encounterBody)
                }else{
                    setEncounterChainBody('No encounters')
                }
                setTimeout(setLoadingToFalse, 500)

            })
    }

    useEffect(() => {
        setLoading(true)
        setEncounterChainBody('No encounters')
        setEncountersUrl(props.encountersUrl)
        if(props.encountersUrl !== '') {
            getEncounters(props.encountersUrl);
        }
    }, [props.encountersUrl]);

    return loading ?
        <CircularProgress key={'circular_progress'} style={{padding:"1%"}}/>
        :
        <List key={'list'} style={{ width: '100%', maxHeight:"400px"}} className={classes.encounter_box}>{encounterChainBody}</List>
        //<List>{encounterChainBody}</List>
}