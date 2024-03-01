import {Navigate, Route, Routes} from "react-router-dom";
import AbuseList from "./pages/AbuseList.jsx";
import AbuseReport from "./pages/AbuseReport.jsx";
import NotFound from "./pages/NotFound.jsx";
import AbuseLayout from "./components/AbuseLayout.jsx";
import {useEffect} from "react";
import {setClientToken} from "./services/clientTokenServise.js";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme.js";

function App() {

    useEffect(() => {
        setClientToken();
    }, []);

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>

              <Route path="/" element={<AbuseLayout />}>
                  <Route path="/" element={<Navigate to="/abuseReport" replace={true}/>} />
                  <Route path="/abuseList" element={<AbuseList />} />
                  <Route path="/abuseReport" element={<AbuseReport />} />
              </Route>

              <Route path="/*" element={<NotFound />} />

          </Routes>
      </ThemeProvider>
  )
}

export default App
