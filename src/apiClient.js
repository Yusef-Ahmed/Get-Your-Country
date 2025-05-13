import axios from "axios";

export async function fetchCountries(url) {
  try {
    const res = await axios.get(url);
    return res.data.filter((country) => country.name.common != "Israel");
  } catch {
    return [];
  }
}
