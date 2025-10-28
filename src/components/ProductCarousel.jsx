import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../styles/productPage.css";

import shirtImage from "../assets/shirtImg.png";
import electronicsImg from "../assets/electronics.png";
import furnitureImg from "../assets/furniture.png";
import productsImg from "../assets/result.png";

import BackIcon from "../assets/icons/back1.svg?react";
import ForwardIcon from "../assets/icons/forward.svg?react";

export default function ProductCarousel() {
  const images = [shirtImage, electronicsImg, furnitureImg, productsImg];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="carousel-container">
      <button ref={prevRef} className="custom-prev" aria-label="Previous">
        <BackIcon className="fa" />
      </button>

      {swiperReady && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          loop={false}
          slidesPerView={1}
          spaceBetween={10}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="swiper-container">
              <img
                src={img}
                alt={`Product ${index}`}
                className="product-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <button ref={nextRef} className="custom-next" aria-label="Next">
        <ForwardIcon className="fa" />
      </button>
    </div>
  );
}
