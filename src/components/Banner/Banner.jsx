import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button/Button";
import { useMovies } from "@/API/movies.service";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
const Banner = ({ type }) => {
  const {
    data: movies,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useMovies(type);
  return (
    <section className="container mb-20 px-10 overflow-hidden">
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
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <BannerList movie={movie}></BannerList>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
function BannerList({ movie }) {
  const { title, poster_path, id } = movie;
  const [isLoading, setIsLoading] = useState(false);

  //original
  return (
    <div className="relative h-[700px] mt-20">
      <Link href={`/movies/${id}`} legacyBehavior>
        <a>
          <Image
            className={`object-cover rounded-lg ${isLoading ? "" : "blur"}`}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt="cardmovie"
            fill={true}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsLoading(true)}
          ></Image>
        </a>
      </Link>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <div className="absolute text-white bottom-5 left-5">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="flex items-center px-4 py-2 border border-white rounded-md gap-x-3">
            <p>Adventure</p>
          </span>
          <span className="flex items-center px-4 py-2 border border-white rounded-md gap-x-3">
            <p>Adventure</p>
          </span>
          <span className="flex items-center px-4 py-2 border border-white rounded-md gap-x-3">
            <p>Adventure</p>
          </span>
        </div>
        <Link
          href={{
            pathname: `/movies/${id}`,
          }}
        >
          <Button className="capitalize">watch now</Button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
