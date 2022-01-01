import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyView from "./CompanyView";
import HomeView from "./HomeView";
import StudentsView from "./StudentsView";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      fetch(
        "https://raw.githubusercontent.com/kdsuneraavinash/cf-timetable-json/master/data.json"
      )
        .then((res) => res.json())
        .then((res) => setData(res));
    }, 30000);

    return () => clearInterval(t);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/students" element={<StudentsView data={data} />} />
        <Route path="/company" element={<CompanyView data={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
