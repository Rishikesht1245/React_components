export const MovieCard = ({ movie }) => {
  return (
    <div className="flex flex-col gap-2 bg-black p-4 rounded-[10px] xs:w-[250px] w-[85%]  h-[350px] shadow-lg shadow-orange-500">
      <img
        className="w-full h-[75%]"
        style={{ objectFit: "cover" }}
        src={` ${
          movie?.poster_path
            ? ` https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://images.pexels.com/photos/2095594/pexels-photo-2095594.jpeg?auto=compress&cs=tinysrgb&w=600"
        }`}
        alt=""
      />
      <p className="text-white text-center py-2">{movie?.title}</p>
    </div>
  );
};
