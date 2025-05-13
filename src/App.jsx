import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const search = useRef();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => res.data)
      .then((data) => data.filter((country) => country.name.common != "Israel"))
      .then((data) => setCountries(data))
      .catch(() => setCountries([]));
  }, []);

  const handleSearch = () => {
    const searchInput = search.current.value.trim();
    const api = searchInput
      ? `https://restcountries.com/v3.1/name/${searchInput}`
      : "https://restcountries.com/v3.1/all";
    axios
      .get(api)
      .then((res) => res.data)
      .then((data) => data.filter((country) => country.name.common != "Israel"))
      .then((data) => setCountries(data))
      .catch(() => setCountries([]));
  };

  return (
    <main className="flex flex-col gap-20">
      <h1 className="text-center text-5xl mt-10 font-bold">Get Your Country</h1>
      <section className="flex justify-center gap-5">
        <input
          className="border rounded p-2"
          ref={search}
          name="search"
        ></input>
        <button className="bg-purple-800 p-2 rounded" onClick={handleSearch}>
          Search
        </button>
      </section>
      {countries.length ? (
        <div className="flex flex-wrap justify-around gap-y-10">
          {countries.map((country, index) => (
            <div key={index} className="w-md border p-2 rounded-md">
              <h1 className="text-center text-2xl my-5">
                {country.name.common}
              </h1>
              <img
                className="h-56 w-full object-contain"
                src={country.flags.svg}
              ></img>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-4xl">No countries found</h1>
      )}
    </main>
  );
}

export default App;
