import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ViewPaste from "./pages/ViewPaste";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paste/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;