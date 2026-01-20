import "../styles/sellPage.css";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useKenyaLocations from "../hooks/useLocationData";

export default function SellPage({ setIsLoginModalOpen }) {
  const kenyaLocations = useKenyaLocations();

  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    category: "",
    condition: "",
    vendor_phone: "",
    price: "",
    images: "",
  });

  const [locationData, setLocationData] = useState(kenyaLocations);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const subCounties =
    locationData.find((c) => c.county === selectedCounty)?.lgas || [];

  const handleForm = async (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    const fomrData = new FormData();
    fomrData.append("title", form.title);
    fomrData.append("location", `${selectedCounty}, ${selectedArea}`);
    fomrData.append("category", form.category);
    fomrData.append("condition", form.condition);
    fomrData.append("vendor_phone", form.vendor_phone);
    fomrData.append("description", form.description);
    fomrData.append("price", form.price);

    for (let i = 0; i < form.images.length; i++) {
      fomrData.append("images", form.images[i]);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products/vendor/createProduct`,
        fomrData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Succesful in creating the porduct! ");
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to create a product post",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!user || user === "Guest") {
      setIsLoginModalOpen(true);
      return;
    }
  }, [user, loading, setIsLoginModalOpen]);
  return (
    <main aria-label="sell page" className="sell-page">
      <header aria-label="sell page header" className="sell-page-header">
        <h3>Sell your product</h3>
      </header>

      <form className="sell-meta-form" aria-label="sell meta form">
        <input
          type="text"
          aria-label="product title"
          className="product-title"
          placeholder="Title*"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          id="product-category"
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          value={form.category}
        >
          <option value="" disabled>
            Category *
          </option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty">Beauty</option>
          <option value="Furniture">Furniture</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Services">Services</option>
          <option value="Repair_construnction">Repair & Construnction</option>
          <option value="Leisure">Leisure</option>
          <option value="Babies">Babies</option>
          <option value="Food">Food</option>
          <option value="Animals_pets">Animals & Pets</option>
          <option value="Property">Property</option>
        </select>

        <select
          value={selectedCounty}
          id="county"
          onChange={(e) => setSelectedCounty(e.target.value)}
          required
        >
          <option value="" disabled>
            Choose County
          </option>
          {locationData.map((location, id) => (
            <option key={id} value={location.county}>
              {location.county}
            </option>
          ))}
        </select>

        {selectedCounty && (
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose Area
            </option>
            {subCounties.map((area, i) => (
              <option key={i} value={area}>
                {area}
              </option>
            ))}
          </select>
        )}

        <select
          id="product_condition"
          required
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          value={form.condition}
        >
          <option value="" disabled>
            Condition*
          </option>
          <option value="Brand new">Brand New</option>
          <option value="Used">Used</option>
          <option value="EX-UK">EX-UK</option>
          <option value="Refurbished">Refurbished</option>
        </select>

        <textarea
          name="prod-description"
          id="product-description"
          placeholder="Description*"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        <input
          type="text"
          aria-label="product price"
          className="product-price"
          placeholder="KSh*"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="text"
          aria-label="vendor Phone"
          className="vendor-phone"
          placeholder="Phone number : 254----"
          onChange={(e) => setForm({ ...form, vendor_phone: e.target.value })}
        />

        <input
          type="file"
          id="imageUpload"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => setForm({ ...form, images: e.target.files })}
        />

        <button onClick={handleForm}>Submit</button>
      </form>

      <NavBar />
    </main>
  );
}
