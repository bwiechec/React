export default function ServiceCalculatorOffer(props) {
  return(
    <>
      <p>Suma: {props.bestPrice} zł</p>
      <p>Wybrane usługi: {props.selectedServicesString} </p>
    </>
  )
}