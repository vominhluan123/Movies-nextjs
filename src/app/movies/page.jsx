"use client";
import CardMovie from "@/components/Movies/CardMovie";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { API_KEY, BASE_URL } from "@/API/movies.service";
import { useDebounce } from "../hook/useDebounce";
import { fetcher } from "../hook/fetcher";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;
export const metadata = {
  title: "Movies Page",
};
const Movies = ({ type = "upcoming" }) => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${nextPage}`
  );
  const filterDebounce = useDebounce(filter, 500);
  const { data, error, isLoading } = useSWR(url, fetcher);
  const pageCount = Math.ceil(data?.total_results / itemsPerPage);
  const handleNextPage = () => {
    setNextPage((prevPage) => prevPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${filterDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${nextPage}`);
    }
  }, [filterDebounce, nextPage]);
  // const [searchError, setSearchError] = useState(false);
  // useEffect(() => {
  //   if (filterDebounce) {
  //     setSearchError(true);
  //   } else {
  //     setSearchError(false);
  //   }
  // }, [data, filterDebounce]);
  return (
    <>
      <title>{metadata.title}</title>
      <section className="px-10 container min-h-screen">
        <div className="flex mb-10">
          <div className="flex-1 input">
            <input
              type="text"
              className="w-full p-4  bg-transparent outline-none"
              placeholder="Type here to search ..."
              onChange={handleFilter}
            />
          </div>
          <button className="p-4 button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {filterDebounce ? (
          <p className="mb-5 capitalize title text-2xl">
            Search results for: {filterDebounce}
          </p>
        ) : (
          ""
        )}
        <div className="grid lg:grid-cols-4  gap-10 pb-10 grid-cols-1">
          {data?.results.map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </div>
        {/* {searchError && (
        <p className="text-red-500">Không tìm thấy kết quả phù hợp.</p>
      )} */}
      </section>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
          onClick={handleNextPage}
        />
      </div>
    </>
  );
};

export default Movies;
