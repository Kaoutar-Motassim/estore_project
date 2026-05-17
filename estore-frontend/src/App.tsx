import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CatalogPage from './pages/catalog/CatalogPage';
import ProductDetailPage from './pages/catalog/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import OrdersPage from './pages/orders/OrdersPage';
import ProfilePage from './pages/profile/ProfilePage';
import CreateListingPage from './pages/listings/CreateListingPage';
import MyListingsPage from './pages/listings/MyListingsPage';
import MySalesPage from './pages/listings/MySalesPage';
import AdminPage from './pages/admin/AdminPage';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/create-listing" element={<PrivateRoute><CreateListingPage /></PrivateRoute>} />
        <Route path="/my-listings" element={<PrivateRoute><MyListingsPage /></PrivateRoute>} />
        <Route path="/my-sales" element={<PrivateRoute><MySalesPage /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
