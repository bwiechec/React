import Select from "react-select";
import * as utils from "../../Utils/utlis"
import ServiceSelectorTable from "./ServiceSelectorTable";
import './ServiceSelector.css';

export default function ServiceSelector(props) {
  const handleServicesChange = (selectedServices) => {
    if(selectedServices.findIndex(service => service.value === utils.TV) >= 0) //JESLI WYBRANO TELEWIZJE MOZNA WYBRAC DEKODER
      utils.serviceList.find(
        service => service.value === utils.DECODER
      ).isDisabled = false
    else{ //JESLI NIE WYBRANO TELEWIZJI DEKODER NIE JEST DOSTEPNY DO WYBORU ORAZ JEST USUWANY Z LISTY JESLI W NIEJ BYL BO OZNACZA TO USUNIECIE TV Z LISTY
      utils.serviceList.find(
        service => service.value === utils.DECODER
      ).isDisabled = true;
      if(selectedServices.findIndex(service => service.value === utils.DECODER) >= 0)
        selectedServices.splice(
          selectedServices.findIndex(
            service => service.value === utils.DECODER
          ),
          1
        )
    }
    //WYCIAGAMY SAME INDEKSY WYBRANYCH USLUG
    selectedServices = selectedServices.map(el => {
      return el.value;
    })

    //AKTUALIZUJEMY WYBRANE USLUGI
    props.updateSelectedServices(selectedServices)
  }
  console.log(utils.pricesMatrix)
  window.pricesMatrix = utils.pricesMatrix
  return (
    <div className="service-selector">
      <Select
        className="service-selector__select"
        options={utils.serviceList}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleServicesChange}
      />

      <ServiceSelectorTable />

    </div>
  )
};