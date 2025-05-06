import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Menu from "./components/ZakahCalculator/Menu";
import ZakahCalculator from "./components/ZakahCalculator/ZakahCalculator";

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
