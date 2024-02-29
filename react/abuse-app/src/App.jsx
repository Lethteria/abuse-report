import {Navigate, Route, Routes} from "react-router-dom";
import AbuseList from "./pages/AbuseList.jsx";
import AbuseReport from "./pages/AbuseReport.jsx";
import NotFound from "./pages/NotFound.jsx";
import AbuseLayout from "./components/AbuseLayout.jsx";
import {useEffect} from "react";
import {setClientToken} from "./services/clientTokenServise.js";

function App() {

    useEffect(() => {
        setClientToken();
    }, []);

  return (
      <Routes>

        <Route path="/" element={<AbuseLayout />}>
          <Route path="/" element={<Navigate to="/abuseReport" replace={true}/>} />
          <Route path="/abuseList" element={<AbuseList />} />
          <Route path="/abuseReport" element={<AbuseReport />} />
        </Route>

        <Route path="/*" element={<NotFound />} />

      </Routes>
  )
}

export default App
