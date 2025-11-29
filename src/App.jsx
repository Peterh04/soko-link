import { useEffect, useState } from "react";
import "./App.css";
import CommentReview from "./components/CommentReview";
import ChatPage from "./pages/ChatPage";
import CommentPage from "./pages/CommentsPage";
import EmailSignIn from "./pages/EmailSignIn";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import ProductPage from "./pages/ProductPage";
import ReceiptPage from "./pages/ReceiptPages";
import RegisterPage from "./pages/RegisterPage";
import ResultsPage from "./pages/ResultsPage";
import SignInPage from "./pages/SignInPage";
import SuccessfulOrderPage from "./pages/SuccessfulOrderPage";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import SecurityPage from "./pages/SecurityPage";
import WishlistPage from "./pages/WishlistPage";
import SellPage from "./pages/SellPage";

function App() {
  const [user, setUser] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchProducts, setSearchProducts] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearchProducts={setSearchProducts}
            searchProducts={searchProducts}
          />
        }
      ></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<SignInPage />}></Route>
      <Route path="/login/email" element={<EmailSignIn />}></Route>
      <Route path="/product/:id" element={<ProductPage />}></Route>
      <Route
        path="/profile"
        element={<ProfilePage user={user} setUser={setUser} />}
      ></Route>
      <Route path="/profile/security" element={<SecurityPage />}></Route>
      <Route path="/wishlist" element={<WishlistPage />}></Route>
      <Route path="/sell" element={<SellPage />}></Route>
      <Route
        path="/products/search/:term"
        element={
          <ResultsPage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearchProducts={setSearchProducts}
            searchProducts={searchProducts}
          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
