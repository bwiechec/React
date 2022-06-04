import './App.css';
import React from "react";
import {
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from "@mui/material";
import { trackPromise } from 'react-promise-tracker';
import {NavLink, Outlet} from 'react-router-dom'

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            pokemons: null,
            currentPage: 1,
            loading: false
        };
    }

    setLoadingToFalse = () =>{
        this.setState({loading: false})
    }

    getListOfPokemons = (offset) => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=25&offset='+offset)
            .then(res => res.json())
            .then(pokemonsJson => {
                this.setState({
                    pokemons: pokemonsJson['results'],
                    count:pokemonsJson['count'],
                });
                setTimeout(this.setLoadingToFalse, 300);
                this.render();

            })
    }

    componentDidMount() {
        let offset = 25 * (this.state.page - 1)
        this.setState({loading: true})
        this.getListOfPokemons(offset);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let offset = 25 * (this.state.page - 1)
        if(prevState.page !== this.state.page) {
            this.setState({loading: true})
            this.getListOfPokemons(offset);
        }
   }

    render(){
        const poks = this.state.pokemons !== null ? Object.keys(this.state.pokemons) : null;
        const list = [];
        poks !== null ? poks.forEach((key)=>{
                let number = this.state.pokemons[key]['url'].split('/')
                number = number[number.length - 2];
                list.push(
                    <TableRow key={number}>
                        <TableCell key={'TableCell_Number_'+number} align="center">#{number}</TableCell>
                        <TableCell key={'TableCell_Pokemon_'+number} align="center">
                            {this.state.pokemons[key]['name'][0].toUpperCase()+this.state.pokemons[key]['name'].slice(1,)}
                        </TableCell>
                        <TableCell key={'TableCell_Link_'+number} align="center">
                            <NavLink to={`/pokemon/${number}`}
                                     key={number+'_link'}>
                                    More about {this.state.pokemons[key]['name'][0].toUpperCase()+this.state.pokemons[key]['name'].slice(1,)}
                            </NavLink>
                        </TableCell>
                    </TableRow >
                )
            }):
            list.push(<TableRow key={'App_Div_No_Poks'}><TableCell>No pokemons found</TableCell></TableRow>);
        return (
            <div key={'App_Div'} className="App" style={{ display: "flex" }}>
                <div key={'TableDiv'} style={{ display: "block", padding: '1rem', border: '1px solid black' }}>
                    <Pagination key={'pagination'} size="large" count={Math.ceil(this.state.count / 25)} style={{justifyContent: 'center',  minWidth: "450px" }}
                            onChange={(event, page) => {this.setState({page: page, pokemons: null})}}/>
                    {!this.state.loading ?
                        <Table key={'Table'} sx={{minWidth: "450px"}} size="small" aria-label="pokedex">
                            <TableHead key={'TableHead'}>
                                <TableRow key={'TableRow'}>
                                    <TableCell key={'TableCell_Number'} align="center">Number</TableCell>
                                    <TableCell key={'TableCell_Pokemon'} align="center">Pokemon</TableCell>
                                    <TableCell key={'TableCell_Link'} align="center">Link</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody key={'TableBody'}>
                                {list}
                            </TableBody>
                        </Table>
                        :
                        <CircularProgress key={'Progress'} style={{padding:"1%", alignSelf: "center", textAlign: "center", margin: "0 auto"}}/>
                    }
                </div>
                <Outlet />
            </div>
        )
    }
}

export default App;
