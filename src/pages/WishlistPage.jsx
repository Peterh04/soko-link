import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/wishListPage.css";
import ProductPreview from "../components/ProductPreview";
import LoginRequired from "../components/LoginRequired";
import { useAuth } from "../context/AuthContext";
import api from "../modules/apiClient";

export default function WishlistPage({ setIsLoginModalOpen }) {
  const { user, loading } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (loading) return;

    if (!user || user === "Guest") {
      setIsLoginModalOpen(true);
      return;
    }
  }, [user, loading, setIsLoginModalOpen]);
  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const { data } = await api.get("/api/user/userWishlist/");

        setWishlist(data.wishliist);
      } catch (error) {
        console.error(
          "Failed to fetch user wishlist",
          error.response?.data || error.message,
        );
      }
    };

    fetchUserWishlist();
  }, []);

  const priceString = (price) => Number(price).toLocaleString();
  return (
    <main aria-label="wishlist page" className="wishlist-page">
      <header
        aria-label="wishlist pager header"
        className="wishlist-page-header"
      >
        <h3>Product Details</h3>
      </header>

      <section aria-label="wishlist products" className="wishlist-products">
        {wishlist.map((wish) => (
          <ProductPreview
            key={wish.Product.id}
            id={wish.Product.id}
            name={wish.Product.title}
            price={priceString(wish.Product.price)}
            location={wish.Product.location}
            image={wish.Product.images[0]}
          />
        ))}
      </section>

      <NavBar />
    </main>
  );
}
