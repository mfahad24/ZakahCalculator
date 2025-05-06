import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Menu from "./pages/ZakahCalculator/Menu";
import ZakahCalculator from "./pages/ZakahCalculator/ZakahCalculator";

import "./App.css";

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/zakah-calculator" element={<ZakahCalculator />} />
      </Routes>
    </>
  );
};

export default App;
