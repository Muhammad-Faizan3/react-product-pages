import React from "react";
import bannerImage from "../assets/8.jpg";
import { useTheme } from '../App';

export default function Banner() {
  const { dark } = useTheme();
  return (
    <section className="banner-section">
      <img
        src={bannerImage}
        alt="NovaDrive Banner"
        className="banner-image"
      />

      <style>{`
        .banner-section {
          width: 100%;
          height: 80vh;
          overflow: hidden;
          line-height: 0;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 768px) {
          .banner-section {
            height: 50vh;
          }
        }
      `}</style>
    </section>
  );
}
