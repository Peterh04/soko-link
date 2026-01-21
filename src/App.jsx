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
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import SecurityPage from "./pages/SecurityPage";
import WishlistPage from "./pages/WishlistPage";
import SellPage from "./pages/SellPage";
import ChatsPage from "./pages/ChatsPage";
import InvoicesPage from "./pages/InvoicesPage";
import ProductsPage from "./pages/ProductsPage";
import LoginRequired from "./components/LoginRequired";
import axios from "axios";
import AlertBox from "./components/AlertBox";
import { useAlert } from "./context/AlertContext";
function App() {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchProducts, setSearchProducts] = useState(null);
  const [buyerId, setBuyerId] = useState();
  const [vendorId, setVendorId] = useState();
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [invoice, setInnvoice] = useState({
    phoneNumber: null,
    amount: 0,
  });

  const [messages, setMessages] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [vendorReviews, setVendorReviews] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();
  const { alert } = useAlert();

  return (
    <>
      <AlertBox
        message={alert.message}
        type={alert.type}
        visible={alert.visible}
      />
      <LoginRequired
        isLoginModalOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          navigate("/");
        }}
        message={"access this feature"}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              setProducts={setProducts}
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
        <Route
          path="/product/:id"
          element={
            <ProductPage
              setBuyerId={setBuyerId}
              setVendorId={setVendorId}
              key={location.pathname}
              messages={messages}
              setMessages={setMessages}
              vendorReviews={vendorReviews}
              setVendorReviews={setVendorReviews}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
              setUser={setUser}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          }
        ></Route>
        <Route path="/profile/security" element={<SecurityPage />}></Route>
        <Route
          path="/wishlist"
          element={<WishlistPage setIsLoginModalOpen={setIsLoginModalOpen} />}
        ></Route>
        <Route
          path="/sell"
          element={<SellPage setIsLoginModalOpen={setIsLoginModalOpen} />}
        ></Route>
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
        <Route
          path="/connect/:buyerId/:vendorId"
          element={
            <ChatPage
              buyerId={buyerId}
              vendorId={vendorId}
              sender={sender}
              messages={messages}
              setMessages={setMessages}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          }
        ></Route>
        <Route
          path="/chats"
          element={
            <ChatsPage
              buyerId={buyerId}
              vendorId={vendorId}
              setBuyerId={setBuyerId}
              setVendorId={setVendorId}
              setSender={setSender}
              setReceiver={setReceiver}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          }
        ></Route>
        <Route
          path="/payment/:id"
          element={<PaymentPage setReceipt={setReceipt} />}
        ></Route>
        <Route
          path="/payment/success/:id"
          element={<ReceiptPage receipt={receipt} vendorId={vendorId} />}
        ></Route>
        <Route
          path="/invoices"
          element={<InvoicesPage setReceipt={setReceipt} />}
        ></Route>
        <Route
          path="/reviews"
          element={<CommentPage vendorReviews={vendorReviews} />}
        ></Route>
        <Route
          path="/products"
          element={<ProductsPage vendorId={vendorId} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
