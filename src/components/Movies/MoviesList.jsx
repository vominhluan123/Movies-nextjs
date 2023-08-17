import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardMovie from "./CardMovie";
import "swiper/css";
import "swiper/css/autoplay";
import { useMovies } from "@/API/movies.service";
const MoviesList = ({ type }) => {
  const {
    data,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useMovies(type);

  return (
    <div className="movie-list">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={30}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie movie={movie}></CardMovie>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
