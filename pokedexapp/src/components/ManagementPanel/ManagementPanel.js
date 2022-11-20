import {React, useState, useEffect} from 'react';
import {Button, CircularProgress} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";

export default function ManagementPanel(props){
  const params = useParams();

  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(0);

  const [isLoadingPrev, setIsLoadingPrev] = useState(true);
  const [isLoadingNext, setIsLoadingNext] = useState(true);

  const [isLoading, setIsLoading] = useState(true)

  const checkPrev = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset='+(parseInt(params.pokemon) - 2)+'&limit=1')
      .then(res => res.json())
      .then(resJson => {
        resJson.results.length ? setIsPrev(true) : setIsPrev(false);
        resJson.results.length ? setPrev(parseInt(resJson.results[0].url.split('/').reverse()[1])) : setPrev(0);
        setIsLoadingPrev(false);
      })
  }

  const checkNext = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset='+(parseInt(params.pokemon))+'&limit=1')
      .then(res => res.json())
      .then(resJson => {
        resJson.results.length ? setIsNext(true) : setIsNext(false);
        resJson.results.length ? setNext(parseInt(resJson.results[0].url.split('/').reverse()[1])) : setNext(0);
        setIsLoadingNext(false);
      })
  }

  useEffect(() => {
    setIsLoadingPrev(true);
    setIsLoadingNext(true);
    setIsLoading(true);

    checkPrev();
    checkNext();
  }, [params.pokemon])

  useEffect(() => {
    setInterval(() => {
      if(!isLoadingPrev && !isLoadingNext) setIsLoading(false)
    }, 200);
  }, [isLoadingPrev, isLoadingNext])

  if(isLoading){
    return (
      <div key={'management_panel'} className={'pokeManagementPanel'}
           style={{justifyContent: 'center', backgroundColor: "#f2f2f2", position: 'sticky', top: '0', zIndex: '1234'}}>
        <CircularProgress
          key={'circularProgress'}
          style={{padding: "1%"}}
        />
      </div>
    )
  }

  return (
    <div key={'management_panel'} className={'pokeManagementPanel'}
         style={{justifyContent: 'center', backgroundColor: "#f2f2f2", position: 'sticky', top: '0', zIndex: '1234', display: "flex"}}>

      {isPrev && !isLoading &&
        <div className={'prevButton'}
             style={{fontSize: "40px", maxWidth: "20%", float: "left", marginLeft: "5%", justifyContent: 'center', position: "absolute", left: "0"}}>
            <NavLink to={`/pokemon/${prev}`} style={{textDecoration: 'none'}}>
              <Button variant="contained" size="medium">&larr;</Button>
            </NavLink>
        </div>
      }

      <h1 className={'pokeList'} style={{display: "inline-flex", fontFamily: "'Flexo-Demi',arial,sans-serif"}}>
        {props.pokemon['name'][0].toUpperCase() + props.pokemon['name'].substring(1)}
      </h1>

      {isNext && !isLoading &&
        <div className={'nextButton'} style={{fontSize: "40px", maxWidth: "20%", float: "right", marginRight: "5%", position: "absolute", right: "0"}}>
          <NavLink to={`/pokemon/${next}`} style={{textDecoration: 'none'}}>
            <Button variant="contained" size="medium">&rarr;</Button>
          </NavLink>
        </div>
      }



    </div>
  )
}