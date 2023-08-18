import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dasboard from "./pages/Dasboard.jsx";
import Login from "./components/Login.jsx";
import User from "./pages/User.jsx";
import Products from "./pages/Products.jsx";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
