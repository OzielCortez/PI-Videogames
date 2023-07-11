import style from "../VideogameCard/VideogameCard.module.css";

function VideogameCard({
  id,
  name,
  description,
  platforms,
  image,
  launchDate,
  rating,
  genres,
}) {
  const genresToString = genres
    ? genres.map((genre) => genre.name).join(", ")
    : " ";
  return (
    <div className={style.card}>
      <p>{name}</p>
      <p>{genresToString}</p>
      <img src={image} alt={name} className={style.image} />
    </div>
  );
}
export default VideogameCard;
