import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/wishListPage.css";
import axios from "axios";
import ProductPreview from "../components/ProductPreview";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchUserWishlist = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          "http://localhost:5001/api/user/userWishlist/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Succesfully fetched the wishlist", data.wishliist);
        setWishlist(data.wishliist);
      } catch (error) {
        console.error(
          "Failed to fetch user wishlist",
          error.response?.data || error.message
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
