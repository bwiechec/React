import './App.css';
import React from "react";
import {CircularProgress, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Button} from "@mui/material";
import {ArrowBackIos, ArrowForwardIos, FilterAlt, FilterAltOff} from '@mui/icons-material';
import {NavLink, Outlet} from 'react-router-dom'
import Filters from './components/Filters/Filters'

const ELEMENTS_IN_PAGE = 15;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      pokemons: null,
      currentPage: 1,
      loading: false,
      filtersShow: false,
      filtersTooltip: 'Show filters',
    };
  }

  setLoadingToFalse = () => {
    this.setState({loading: false})
  }

  getListOfPokemons = (offset) => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+ELEMENTS_IN_PAGE+'&offset=' + offset)
      .then(res => res.json())
      .then(pokemonsJson => {
        this.setState({
          pokemons: pokemonsJson['results'],
          count: pokemonsJson['count'],
        });
        setTimeout(this.setLoadingToFalse, 300);
        this.render();

      })
  }

  componentDidMount() {
    let offset = ELEMENTS_IN_PAGE * (this.state.page - 1)
    this.setState({loading: true})
    this.getListOfPokemons(offset);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let offset = ELEMENTS_IN_PAGE * (this.state.page - 1)
    if (prevState.page !== this.state.page) {
      this.setState({loading: true})
      this.getListOfPokemons(offset);
    }
  }

  hideTable = () => {
    // document.querySelector('.pokemon_table').style.opacity = '0';
    // document.querySelector('.pokemon_table').style.maxWidth = '0px';
    document.querySelector('.pokemon_table').classList.add('hidden');
    document.querySelector('.pokemon_table table').classList.add('hidden');
    document.querySelector('.pokemon_table nav').classList.add('hidden');
    document.querySelector('.show_table').style.opacity = '1';
    document.querySelector('.show_table').style.maxWidth = '100%';
    document.querySelector('.show_table').style.padding = '2rem';
  }

  showTable = () => {
    // document.querySelector('.pokemon_table').style.opacity = '1';
    // document.querySelector('.pokemon_table').style.maxWidth = '100%';
    document.querySelector('.pokemon_table').classList.remove('hidden');
    document.querySelector('.show_table').style.opacity = '0';
    document.querySelector('.show_table').style.maxWidth = '0px';
    document.querySelector('.show_table').style.padding = '0px';
    setTimeout(() => {
      document.querySelector('.pokemon_table table').classList.remove('hidden');
      document.querySelector('.pokemon_table nav').classList.remove('hidden');
    }, 500)
  }

  changeFilterVisibility = () => {
    this.setState((prev) => ({filtersShow: !prev.filtersShow}))
    this.state.filtersShow ?
      this.setState({filtersTooltip: 'Show filters'})
      :
      this.setState({filtersTooltip: 'Hide filters'});
  }

  render() {
    const poks = this.state.pokemons !== null ? Object.keys(this.state.pokemons) : null;
    const list = [];
    poks !== null ? poks.forEach((key) => {
        let number = this.state.pokemons[key]['url'].split('/')
        number = number[number.length - 2];
        list.push(
          <TableRow key={number} style={{backgroundColor: "white"}}>
            <TableCell key={'TableCell_Number_' + number} align="center">#{number}</TableCell>
            <TableCell key={'TableCell_Pokemon_' + number} align="center">
              {this.state.pokemons[key]['name'][0].toUpperCase() + this.state.pokemons[key]['name'].slice(1,)}
            </TableCell>
            <TableCell key={'TableCell_Link_' + number} align="center">
              <NavLink to={`/pokemon/${number}`}
                       key={number + '_link'}>
                <Button>More</Button>
                {/*More about {this.state.pokemons[key]['name'][0].toUpperCase() + this.state.pokemons[key]['name'].slice(1,)}*/}
              </NavLink>
            </TableCell>
          </TableRow>
        )
      }) :
      list.push(<TableRow key={'App_Div_No_Poks'}><TableCell>No pokemons found</TableCell></TableRow>);
    return (
      <div key={'App_Div'} className="App">
        <div className={'show_table'}>
          <Tooltip title="Show" onClick={() => this.showTable()}>
            <ArrowForwardIos />
          </Tooltip>
        </div>

        <div key={'TableDiv'} className={"sticky pokemon_table"}>
          {!this.state.loading ?
            <Table key={'Table'} sx={{minWidth: "450px"}} size="small" aria-label="pokedex">
              <TableHead key={'TableHead'}>
                <TableRow key={'TableRow'}>
                  <TableCell key={'TableCell_Number'} align="center">Number</TableCell>
                  <TableCell key={'TableCell_Pokemon'} align="center">Pokemon</TableCell>
                  <TableCell key={'TableCell_Link'} align="center" >
                    <Tooltip title="Hide" onClick={() => this.hideTable()}>
                      <ArrowBackIos />
                    </Tooltip>
                    {/*// filters hidden for now - hard to use them with vanilla API*/}
                    {/*<Tooltip title={this.state.filtersTooltip} onClick={() => this.changeFilterVisibility()}>*/}
                    {/*  {!this.state.filtersShow ? <FilterAlt style={{float: "right"}}/> : <FilterAltOff style={{float: "right"}}/>}*/}
                    {/*</Tooltip>*/}
                  </TableCell>
                </TableRow>
              </TableHead>
              {
                this.state.filtersShow && <Filters/>
              }
              <TableBody key={'TableBody'}>
                {list}
              </TableBody>
            </Table>
            :
            <CircularProgress key={'Progress'}
                              style={{padding: "1%", alignSelf: "center", textAlign: "center", margin: "0 auto"}}
            />
          }

          <Pagination key={'pagination'} size="large" count={Math.ceil(this.state.count / ELEMENTS_IN_PAGE)}
            style={{justifyContent: 'center', minWidth: "450px"}}
            onChange={(event, page) => {
              this.setState({page: page, pokemons: null})
            }}
          />
        </div>
      </div>
    )
  }
}

export default App;
