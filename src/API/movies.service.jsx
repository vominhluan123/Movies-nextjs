import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API_KEY = "1297fc1f6e6d865cdb8ff8d6f8833e68";
export const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (type = "upcoming") => {
  const url = `${BASE_URL}/movie/${type}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};
const fetchMovieDetails = async (id) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const responses = await axios.get(url);
  return responses.data;
};
const fetchMovieCats = async (id) => {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
  const responses = await axios.get(url);
  return responses.data.cast;
};
const fetchMovieTrailers = async (id) => {
  const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;
  const responses = await axios.get(url);
  return responses.data;
};

const fetchMovieSimilar = async (id) => {
  const url = `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`;
  const responses = await axios.get(url);
  return responses.data;
};
const fetchSearchMovies = async (keyword) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}`;
  const responses = await axios.get(url);
  return responses.data;
};
const useMovieDetails = (id) => {
  return useQuery(["moviedetails", id], () => fetchMovieDetails(id), {
    staleTime: 1000 * 60 * 10,
  });
};

const useMovieSimilar = (id) => {
  return useQuery(["similar", id], () => fetchMovieSimilar(id), {
    staleTime: 1000 * 60 * 10,
  });
};

const useMovieCast = (id) => {
  return useQuery(["cast", id], () => fetchMovieCats(id), {
    staleTime: 1000 * 60 * 10,
  });
};
const useMovies = (type) => {
  return useQuery(["movies", type], () => fetchMovies(type), {
    staleTime: 1000 * 60 * 10,
  });
};
const useMovieTrailers = (id) => {
  return useQuery(["trailers", id], () => fetchMovieTrailers(id), {
    staleTime: 1000 * 60 * 10,
  });
};
const useSearchMovies = (keyword) => {
  return useQuery(["search", keyword], () => fetchSearchMovies(keyword), {
    staleTime: 1000 * 60 * 10,
  });
};
export {
  useMovieDetails,
  useMovieCast,
  useMovies,
  useMovieTrailers,
  useMovieSimilar,
  useSearchMovies,
};
