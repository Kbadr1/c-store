import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import StateContextProvider from "./context/StateContext";
import { Cart, Home, Product, Category } from "./pages";

function App() {
  return (
    <StateContextProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </StateContextProvider>
  );
}

export default App;
