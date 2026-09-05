import { useState } from "react";
import "../styles/categoryItem.css";
import { useNavigate } from "react-router-dom";
import api from "../modules/apiClient";

export default function CategoryItem({
  name,
  children,
  setFilteredCategoryProducts,
  setCategoryTerm,
}) {
  const navigate = useNavigate();

  const handleCategoryFilter = async () => {
    try {
      const { data } = await api.get(
        `/api/products/search?category=${encodeURIComponent(name)}`,
      );
      const filteredCategoryProducts = data.filteredProducts.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        location: product.location,
        price: product.price,
        images: product.images,
        createdAt: product.createdAt,
        vendorId: product.vendorId,
      }));
      console.log(filteredCategoryProducts);
      setFilteredCategoryProducts(filteredCategoryProducts);
      navigate(`/products/category/${name}`);
    } catch (error) {
      setFilteredCategoryProducts(null);
      console.error(
        "Failed to get products based on this category",
        error.response?.data || error.message,
      );
      navigate(`/products/category/${name}`);
    }
  };
  return (
    <li
      className="category-item"
      onClick={() => {
        setCategoryTerm(name);
        handleCategoryFilter();
      }}
    >
      <div className="category-item-icon-container">{children}</div>
      <p>{name}</p>
    </li>
  );
}
