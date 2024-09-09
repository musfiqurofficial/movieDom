import React, { useEffect, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ActorsMovies from "../components/ActorProfile/ActorsMovies";
import NotFound from "../components/NotFound";
import { scrollToTop } from "../tools";

const ActorProfile = () => {
  const [searchParams] = useSearchParams();
  const cast_id = searchParams.get('cast_id');

  useLayoutEffect(() => {
    scrollToTop();
  }, []);

  return (
    cast_id
      ? <ActorsMovies />
      : <NotFound/>
  )
};

export default ActorProfile;
