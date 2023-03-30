import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./pages/Category";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
