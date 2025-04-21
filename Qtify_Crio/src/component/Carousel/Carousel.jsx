import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import LeftNavButton from "./LeftNavButton";
import RightNavButton from "./RightNavButton";
import { Box } from "@mui/material";

const Carousel = ({ data, renderComponent }) => {
  return (
    <Box style={{ position: "relative" }}>
      <LeftNavButton />
      {/* Swiper component for the carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          960: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>{renderComponent(item)}</SwiperSlide>
        ))}
      </Swiper>
      <RightNavButton />
    </Box>
  );
};

export default Carousel;
