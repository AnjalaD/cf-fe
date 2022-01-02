import moment from "moment";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyView from "./views/CompanyView";
import HomeView from "./views/HomeView";
import StudentsView from "./views/StudentsView";

function App() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();

  const fetchData = () => {
    fetch(
      "https://raw.githubusercontent.com/kdsuneraavinash/cf-timetable-json/master/data.json",
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLastUpdated(moment().format("YYYY-MM-DD HH:mm:ss"));
      });
  };

  useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/students"
          element={<StudentsView data={data} lastUpdated={lastUpdated} />}
        />
        <Route
          path="/company"
          element={<CompanyView data={data} lastUpdated={lastUpdated} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
