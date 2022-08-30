import { useState } from "react"


function App() {
  const reglement = ["Espèce", "chèque", "Traite", "Virement", "Retenu"]
  const [nbr, setnbr] = useState(0)
  const handleChange = (nbr) => {
    setnbr(nbr.target.value); 
  }
  const getMultipleRandom =(arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  
  console.log(getMultipleRandom(reglement, nbr));

 
  return (
    <>
    
    <label>Nombre de règlements</label> 
    <input onChange={(nbr)=>handleChange(nbr)}  type={"number"} max={reglement.length} min={1}></input>
    <label>Montant</label>
    <input type={"number"}></input>
    </>
  );
}

export default App;
