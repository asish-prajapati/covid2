import "./App.css";
import capitalize from "capitalize-the-first-letter";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { useState } from "react";
import axios from "axios";
const BASEURL =
  "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com";
const request_headers = {
  "x-rapidapi-key": "801c5fd26bmshd47d4d624f390a0p1c5f1ajsn2f142098dea8",
  "x-rapidapi-host":
    "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
  useQueryString: true,
};

function App() {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [initialMsg, setInitialMsg] = useState(
    "Enter Country Name To Get Covid Data"
  );
  const submitHandler = function (event) {
    event.preventDefault();

    if (inputVal === "") {
      setError("Enter Something");
      setInitialMsg("");
      setTableData([]);
    } else {
      setTableData([]);
      setError("");
      setInitialMsg("");
      setLoading(true);
      axios
        .get(`${BASEURL}/api/npm-covid-data/countries-name-ordered`, {
          headers: request_headers,
        })
        .then((res) => {
          const allCountryCode = res.data;
          const filtered = allCountryCode.filter(
            (item) => item.Country === capitalize(inputVal.trim())
          );
          console.log(filtered);
          if (filtered.length < 1) {
            setError("Country Not Found , Try Again");
            setTableData([]);
            setInitialMsg("");
            setLoading("");
          } else {
            const countryCode = filtered[0].ThreeLetterSymbol;
            axios
              .get(`${BASEURL}/api/api-covid-data/reports/${countryCode}`, {
                headers: request_headers,
              })
              .then((res) => {
                const covidData = res.data;

                setTableData(covidData);
                setLoading(false);
                setError("");
                console.log(covidData);
              });
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="App">
      <Navbar
        inputVal={inputVal}
        submitHandler={submitHandler}
        setInputVal={setInputVal}
      />
      <Content
        error={error}
        initialMsg={initialMsg}
        tableData={tableData}
        loading={loading}
      />
    </div>
  );
}

export default App;
