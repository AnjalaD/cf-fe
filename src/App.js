import { Alert, AlertTitle, Box, Container, Fade } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CompanyView from "./views/CompanyView";
import FindFreeSlotsView from "./views/FindFreeSlotsView";
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
      fetch("https://naughty-yonath-793e17.netlify.app/data_v2.json", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((res) => {
          setError();
          setData(res.data);
          setLastUpdated(res.updated);
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
          <Route
            path="/find-free-slots"
            element={
              <FindFreeSlotsView data={data} lastUpdated={lastUpdated} />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
