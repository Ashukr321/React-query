import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import Loader from "./compoentns/loader/Loader";
import Product from "./pages/product/Product1";
import Product1 from "./pages/product/Product1";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product1" element={<Product1 />} />
      </Routes>
    </div>
  );
};

export default App;
