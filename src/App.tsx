import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductCreatePage from "./pages/ProductCreatePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddProductPage from "./pages/AddProductPage";
import WelcomePage from "./pages/WelcomePage";
import ListUsersPage from "./pages/ListUsersPage";



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/products/create" element={
         <ProtectedRoute>
         <ProductCreatePage />
         </ProtectedRoute>}
         />
         <Route
  path="/usuarios"
  element={
    <ProtectedRoute>
      <ListUsersPage />
    </ProtectedRoute>
  }
/>
         <Route
  path="/welcome"
  element={
    <ProtectedRoute>
      <WelcomePage />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
  path="/add-product"
  element={
    <ProtectedRoute>
      <AddProductPage />
    </ProtectedRoute>
  }
/>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<ProtectedRoute> <CartPage /> </ProtectedRoute> }
        />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
