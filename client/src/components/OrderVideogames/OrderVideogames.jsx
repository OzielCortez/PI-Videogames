import { useDispatch } from "react-redux";
import { orderAllVideogames } from "../../redux/actions";
import { useState } from "react";
import styles from "../OrderVideogames/OrderVideogames.module.css";

const OrderVideogames = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState();
  const orderBy = (event) => {
    event.preventDefault();
    dispatch(orderAllVideogames(event.target.selectedOptions[0].value));
    setOrder(`Ordenado por nombre: ${event.target.value}`);
  };
  return (
    <div className={styles.orderBar}>
      <select
        onChange={(e) => orderBy(e)}
        defaultValue=""
        className={styles.select}
      >
        <option selected hidden>
          Order Videogames
        </option>
        <option disabled>Order by Name</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option disabled>Order by Rating</option>
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </select>
      <p>{order}</p>
    </div>
  );
};

export default OrderVideogames;
