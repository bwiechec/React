import React, {useState, useEffect} from "react";
import {Button} from "@mui/material";
import classes from "./PokemonType.module.css";


export default function PokemonType(props) {
    const type = props.typeList;

    let typeButtons = [<h3 key={'Pokemon_Type'}>Type: </h3>];

    if(type !== null){
        type.forEach((item)=>{
        item !== null ?
            typeButtons.push(<Button key={item.toString()} className={classes[item] + ' ' + classes.typeButton} variant="contained" size="medium">{item}</Button>)
            :
            typeButtons.push("")

        })
    }else{
        typeButtons.push("")
    }

    return typeButtons;
}