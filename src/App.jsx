import { useEffect, useRef, useState } from "react";
import { fetchCountries } from "./apiClient";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useRef();

  useEffect(() => {
    (async () => {
      const countries = await fetchCountries(
        "https://restcountries.com/v3.1/all"
      );
      setCountries(countries);
      setLoading(false);
    })();
  }, []);

  const handleSearch = () => {
    const searchInput = search.current.value.trim();
    const api = searchInput
      ? `https://restcountries.com/v3.1/name/${searchInput}`
      : "https://restcountries.com/v3.1/all";

    (async () => {
      setLoading(true);
      const countries = await fetchCountries(api);
      setCountries(countries);
      setLoading(false);
    })();
  };

  return (
    <main className="flex flex-col gap-20">
      <h1 className="text-center text-3xl md:text-5xl xl:text-7xl mt-10 font-bold">
        Get Your Country
      </h1>
      <section className="flex justify-center gap-5 text-md md:text-xl">
        <input
          className="border rounded p-2 focus:-translate-y-1 duration-100"
          ref={search}
          name="search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        ></input>
        <button
          className="bg-purple-800 p-2 rounded cursor-pointer will-change-transform active:scale-95 hover:scale-105 duration-100"
          onClick={handleSearch}
        >
          Search
        </button>
      </section>
      {countries.length ? (
        <div className="flex flex-wrap justify-around gap-y-10">
          {countries.map((country, index) => (
            <div key={index} className="w-xs border p-2 rounded-md hover:-translate-y-3 duration-100">
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
                    <li key={timezone}>{timezone}</li>
                  ))}
                </ul>
                <ul className="list-disc list-inside">
                  <b>Currencies: </b>
                  {country.currencies &&
                    Object.entries(country.currencies).map(([key, value]) => {
                      if (key == "ILS") return; // Not in my watch
                      return (
                        <li key={key}>
                          {value.symbol} {value.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-4xl">{loading ? "Loading..." : "No countries found"}</h2>
      )}
    </main>
  );
}

export default App;
