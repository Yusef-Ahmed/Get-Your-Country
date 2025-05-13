import axios from "axios";

export async function fetchCountries(url) {
  try {
    const palestine = await axios.get("https://restcountries.com/v3.1/name/palestine");
    const res = await axios.get(url);
    return res.data.map((country) => country.name.common != "Israel" ? country : palestine.data[0]);
  } catch {
    return [];
  }
}
