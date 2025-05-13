import axios from "axios";
import { useRef, useState } from "react"

function App() {
  const [country, setCountry] = useState([]);
  const search = useRef();

  const handleSearch = () => {
    axios.get(`https://restcountries.com/v3.1/name/${search.current.value}`)
    .then(res => res.data)
    .then(data => setCountry(data[0]));
  }

  return (
    <>
    <input className="border" ref={search} name="search"></input>
    <button onClick={handleSearch}>Search</button>
    <div>
      <h1>{country.name.common}</h1>
      <img src={country.flags.svg}></img>
    </div>
    </>
  )
}

export default App
