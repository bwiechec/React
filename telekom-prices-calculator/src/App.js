import './App.css';
import Navbar from "./components/Navbar/Navbar";
import ServiceSelector from "./components/ServiceSelector/ServiceSelector";
import ServiceCalculator from "./components/ServiceCalculator/ServiceCalculator";
import {useState} from "react";

function App() {
  const [selectedServices, setSelectedServices] = useState();

  const updateSelectedServices = (services) => {
    setSelectedServices(services);
  }

  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <ServiceSelector
          updateSelectedServices={updateSelectedServices}
        />

        <ServiceCalculator
          selectedServices={selectedServices}
        />
      </div>

      <footer className="footer">
        <p className="footer__text">Bartosz Wiecheć</p>
      </footer>
    </div>
  );
}

export default App;
