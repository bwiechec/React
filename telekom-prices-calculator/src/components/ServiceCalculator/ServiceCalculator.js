import Select from "react-select";
import {useState} from "react";
import * as utils from "../../Utils/utlis"
import Paper from "@mui/material/Paper";
import ServiceCalculatorOffer from "./ServiceCalculatorOffer";
import './ServiceCalculator.css';

export default function ServiceCalculator(props) {
  const [selectedYear, setSelectedYear] = useState();

  const findBestDeal = () => {
    //ZMIENNA PRZECHOWUJACA CENE LACZNA DLA DANEJ KOMBINACJI PAKIETOW
    let totalPrice = 0;
    //ZMIENNA PRZECHOWUJACA NAJLEPSZA CENE PAKIETOW
    let bestPrice = -1;
    //WYBRANE PAKIETY
    let selectedIndexes = [];

    //JESLI NIE WYBRANO ROKU LUB USLUGI CENA - 0
    if(!selectedYear || !props.selectedServices.length) return <ServiceCalculatorOffer bestPrice={totalPrice} selectedServicesString={''}/>;

    //JESLI WYBRANO TYLKO JEDNA USLUGE
    if(props.selectedServices.length === 1)
      return <ServiceCalculatorOffer
        bestPrice={utils.pricesMatrix[props.selectedServices[0]][selectedYear]}
        selectedServicesString={utils.serviceNames[props.selectedServices[0]]}
      />

    //SPRAWDZAM CENY DLA KAZDEGO INDEKSU
    props.selectedServices?.forEach(service => {
      let servicesTemp = [...props.selectedServices].filter(serv => serv !== service);
      let selectedIndexesTemp = [];
      //W OBREBIE DANEGO INDEKSU SPRAWDZAM KAZDY INNY PO KOLEI CZY TWORZA PAKIET
      servicesTemp.forEach(serviceTemp => {
        totalPrice = 0;
        selectedIndexesTemp = []
        let servicesTempToSum = [...servicesTemp].filter(serv => serv !== serviceTemp);
        if(utils.pricesMatrix[service + serviceTemp]){
          //JESLI TWORZA PAKIET DODAJE GO DO SUMY
          totalPrice += utils.pricesMatrix[service + serviceTemp][selectedYear]
          selectedIndexesTemp.push(service + serviceTemp);
        }
        else{
          //JESLI NIE TWORZA PAKIETU DODAJE JE OSOBNO
          totalPrice += utils.pricesMatrix[service][selectedYear] + utils.pricesMatrix[serviceTemp][selectedYear];
          selectedIndexesTemp.push(service);
          selectedIndexesTemp.push(serviceTemp);
        }
        //NASTEPNIE WSZYSTKIE INNE USLUGI DODAJE
        servicesTempToSum.forEach(serviceToSum => {
          //JESLI SPRAWDZAM CENY DLA PAKIETU INTERNET + TELEWIZJA I AKTUALNIE JESTESM NA DEKODERZE USTAWIAM MU CENE 0
          serviceToSum === utils.DECODER && (service + serviceTemp) === utils.INTERNET_TV?
            totalPrice += 0
              :
            totalPrice += utils.pricesMatrix[serviceToSum][selectedYear];
            selectedIndexesTemp.push(serviceToSum);
        })
        //PRZYPISUJE WYBRANE PAKIETY I MINIMALNA CENE ZE ZMIENNYCH POMOCNICZYCH
        selectedIndexes = bestPrice > totalPrice || bestPrice === -1 ? selectedIndexesTemp : selectedIndexes;
        bestPrice = bestPrice > totalPrice || bestPrice === -1 ? totalPrice : bestPrice;
      })
    })
    //FORMATUJE INDEKSY TAK, ABY BYLA INFORMACJA ZWROTNA O WYBRANYCH PAKIETACH
    let selectedServicesString = selectedIndexes.map(service => {
      return utils.serviceNames[service]
    })

    return <ServiceCalculatorOffer
      bestPrice={bestPrice}
      selectedServicesString={selectedServicesString.join(', ')}
    />;
  }

  return (
    <div className="service-calculator">

      <Select
        options={utils.yearOptions}
        onChange={(selected) => setSelectedYear(selected.value)}
      />

      <Paper
        className="service-calculator__summary"
      >
        {findBestDeal()}
      </Paper>
    </div>
  )
};