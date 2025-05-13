import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const search = useRef();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => res.data)
      .then((data) => data.filter((country) => country.name.common != "Israel")) // Not in my watch
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
      .then((data) => data.filter((country) => country.name.common != "Israel")) // Not in my watch
      .then((data) => setCountries(data))
      .catch(() => setCountries([]));
  };

  return (
    <main className="flex flex-col gap-20">
      <h1 className="text-center text-3xl md:text-5xl xl:text-7xl mt-10 font-bold">Get Your Country</h1>
      <section className="flex justify-center gap-5 text-xl md:text-xl">
        <input
          className="border rounded p-2"
          ref={search}
          name="search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        ></input>
        <button
          className="bg-purple-800 p-2 rounded cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </section>
      {countries.length ? (
        <div className="flex flex-wrap justify-around gap-y-10">
          {countries.map((country, index) => (
            <div key={index} className="w-sm border p-2 rounded-md">
              <h1 className="text-center text-2xl my-3">
                {country.name.common}
              </h1>
              <img
                className="h-56 w-full object-contain"
                src={country.flags.svg}
              ></img>
              <div className="flex flex-col gap-2 px-2 my-3">
                <p>
                  <b>Capital:</b> {country.capital?.join(", ")}
                </p>
                <p>
                  <b>Population:</b> {country.population}
                </p>
                <ul className="list-disc list-inside">
                  <b>Timezones:</b>{" "}
                  {country.timezones.map((timezone) => (
                    <li>{timezone}</li>
                  ))}
                </ul>
                <ul className="list-disc list-inside">
                  <b>Currencies: </b>
                  {country.currencies &&
                    Object.entries(country.currencies).map(([key, value]) => {
                      if (key == "ILS") return; // Not in my watch
                      return (
                        <li key={key}>
                          {key}: {value.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
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
