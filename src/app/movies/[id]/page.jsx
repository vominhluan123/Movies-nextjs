"use client";
import {
  useMovieCast,
  useMovieDetails,
  useMovieSimilar,
  useMovieTrailers,
} from "@/API/movies.service";
import { Autoplay } from "swiper";
import CardMovie from "@/components/Movies/CardMovie";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
const MoviesDetail = ({ params }) => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const router = useRouter();
  const { user } = useAuth();
  React.useEffect(() => {
    if (!user) router.replace("/auth/login");
  }, [user]);

  const {
    data: movie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useMovieDetails(params.id);

  const [isLoading, setIsLoading] = useState(false);
  const {
    data: cast,
    isLoading: isLoadingCast,
    isError: isErrorCast,
  } = useMovieCast(params.id);
  const {
    data: trailer,
    isLoading: isLoadingTrailer,
    isError: isErrorTrailer,
  } = useMovieTrailers(params.id);

  const {
    data: similar,
    isLoading: isLoadingSimilar,
    isError: isErrorSimilar,
  } = useMovieSimilar(params.id);

  return (
    <>
      <title>{movie?.title}</title>
      <div className="py-10 px-10">
        <div className="h-[600px] relative container">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div
            className={`w-full h-full bg-no-repeat bg-cover px-10 ${
              isLoading ? "" : "blur"
            }`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
            }}
          ></div>
        </div>
        <div className="max-w-[700px] h-[500px] relative container mx-auto -mt-[200px] z-10 mb-10">
          <Image
            className={`object-cover rounded-xl w-full h-full ${
              isLoading ? "" : "blur"
            }`}
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt="moviedetails"
            fill={true}
            onLoadingComplete={() => setIsLoading(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </div>
        <h1 className="text-center text-4xl mb-10 title font-bold">
          {movie?.title}
        </h1>
        {movie?.genres.length > 0 && (
          <div className="flex title items-center justify-center gap-x-5 mb-10 ">
            {movie?.genres.map((genre) => (
              <span className="py-2 px-4 rounded button" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-center title leading-relaxed max-w-[600px] mx-auto mb-10">
          {movie?.overview}
        </p>
        <h2 className="title text-center text-3xl mb-10">Casts</h2>
        <div className="grid md:grid-cols-4 grid-cols-2  gap-5 mb-10">
          {cast?.slice(0, 4).map((item) => (
            <div key={item.id} className="card-item title h-[500px] ">
              <div className="cast-image relative h-full mb-3">
                <Image
                  className="object-cover rounded-xl"
                  src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
                  alt="profile"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
                  33vw"
                ></Image>
              </div>
              <h3 className="title font-medium">{item?.name}</h3>
            </div>
          ))}
        </div>
        <div className="py-10">
          <div className="flex flex-col gap-5">
            {trailer?.results.slice(0, 2).map((item) => (
              <div key={item.id}>
                <h3 className="text-xl font-medium title mb-5 card-movie p-3 inline-block">
                  {item.name}
                </h3>
                <div className="md:w-full aspect-video w-[300px]">
                  <iframe
                    className="w-full h-full object-fill"
                    width="1271"
                    height="715"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="I Finally 3-Star Memory of Chaos 6 😭 😭 😭 | Honkai Star Rail"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-10">
          <h2 className="capitalize text-3xl mb-10 title font-medium">
            similar movies
          </h2>
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
              {similar?.results.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <CardMovie movie={movie}></CardMovie>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesDetail;
