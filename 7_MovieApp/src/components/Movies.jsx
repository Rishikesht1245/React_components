import { MovieCard } from "./subcomponents/MovieCard";

export const Movies = ({ movies }) => {
  console.log(movies);
  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {movies.map((movie) => {
        return <MovieCard movie={movie} key={movie.id} />;
      })}
    </div>
  );
};
