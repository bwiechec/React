import React from "react";
import {List, ListItem, ListItemButton} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import classes from "./PokemonStats.module.css";


export default function PokemonStats(props) {
    const stat = props.statList;

    let statDiv = [<h3 key={'Pokemon_stats'}>Statistics: </h3>];
    let statList = []
    if(stat!==null) {
        stat.forEach((item) => {
            item !== null ?
                statList.push(
                    <ListItem key={item[0].toUpperCase()+'_item'} disablePadding>
                        {/*<ListItemButton>*/}
                        <ListItemText key={item[0].toUpperCase()} primary={item[0][0].toUpperCase()+item[0].slice(1,)}/>
                        <progress key={item[0].toUpperCase()+'_progress'} id={item[0]} value={item[1]} max="225" style={{maxWidth: '40%'}}> {item[1]}%
                        </progress>
                        {/*</ListItemButton>*/}
                    </ListItem>
                )
                :
                statList.push("")
        })
        statDiv.push(<List key={'List'} style={{padding:"5%"}}>{statList}</List>)
    }else{
        statDiv = ''
    }

    return statDiv;
}