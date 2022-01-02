import { Alert, AlertTitle, Box, Container, Fade } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyView from "./views/CompanyView";
import HomeView from "./views/HomeView";
import StudentsView from "./views/StudentsView";

function App() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();
  const [error, setError] = useState();

  const closeError = () => {
    setError();
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://raw.githubusercontent.com/kdsuneraavinash/cf-timetable-json/master/data.json",
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((res) => {
          setError();
          setData(res);
          setLastUpdated(moment().format("YYYY-MM-DD HH:mm:ss"));
        })
        .catch(() => {
          setError(
            `Failed to fetch data at: ${moment().format("YYYY-MM-DD HH:mm:ss")}
            <br/>
            <strong>Please check you internet connection</strong>`
          );
        });
    };

    fetchData();
    const t = setInterval(fetchData, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {error && (
        <Fade in>
          <Box sx={{ position: "fixed", bottom: 10, left: 0, width: 1 }}>
            <Container maxWidth="sm">
              <Alert severity="error" onClose={closeError}>
                <AlertTitle>Error</AlertTitle>
                <span dangerouslySetInnerHTML={{ __html: error }} />
              </Alert>
            </Container>
          </Box>
        </Fade>
      )}
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
    </>
  );
}

export default App;
