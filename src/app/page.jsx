"use client";
import React from "react";
import MoviesList from "@/components/Movies/MoviesList";
import Banner from "@/components/Banner/Banner";
import { LoadingSpiner } from "@/components/Loading/LoadingSpiner";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <Banner type="upcoming" />
          <section className="container px-10 mb-20">
            <h2 className="mb-5 text-3xl font-bold capitalize title text-primary">
              now playing
            </h2>
            <MoviesList type="now_playing" />
          </section>
          <section className="container px-10 mb-20">
            <h2 className="mb-5 text-3xl font-bold capitalize title text-primary">
              top rated
            </h2>
            <MoviesList type="top_rated" />
          </section>
          <section className="container px-10 pb-10 title">
            <h2 className="mb-5 text-3xl font-bold capitalize text-primary">
              popular
            </h2>
            <MoviesList type="popular" />
          </section>
        </>
      )}
    </>
  );
}
