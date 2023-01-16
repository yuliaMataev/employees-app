import { Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./pages/Details";
import Employees from "./pages/Employees";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Employees />} />
      <Route path="/details" element={<Details />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
