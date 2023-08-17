import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../Button/Button";

const CardMovie = ({ movie }) => {
  const { id, poster_path, title, release_date, vote_average } = movie;
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full p-3 rounded-lg select-none card-movie">
      <div className="relative h-[350px] mb-5">
        <Link href={`/movies/${id}`} legacyBehavior>
          <a>
            <div
              className={`object-cover rounded-lg relative w-full h-full ${
                isLoading ? "skeleton-image" : ""
              }`}
            >
              <Image
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt="cardmovie"
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={handleImageLoad}
              />
            </div>
          </a>
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold capitalize">
          {isLoading ? <Skeleton width={150} /> : title}
        </h3>
        <div className="flex items-center justify-between mb-5 text-sm">
          <span>
            {isLoading ? (
              <Skeleton width={50} />
            ) : (
              new Date(release_date).getFullYear()
            )}
          </span>
          <span>
            {isLoading ? <Skeleton width={30} /> : vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      {isLoading ? (
        <Skeleton width={250} height={40} borderRadius={8} />
      ) : (
        <Link
          href={{
            pathname: `/movies/${id}`,
          }}
        >
          <Button className="w-full mt-auto capitalize">watch now</Button>
        </Link>
      )}
    </div>
  );
};

export default CardMovie;
