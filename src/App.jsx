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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<SignInPage />}></Route>
      <Route path="/login/email" element={<EmailSignIn />}></Route>
      <Route path="/product/:id" element={<ProductPage />}></Route>
    </Routes>
  );
}

export default App;
