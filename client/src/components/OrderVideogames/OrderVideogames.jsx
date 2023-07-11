import { useDispatch } from "react-redux";
import { orderAllVideogames } from "../../redux/actions";
import { useState } from "react";

const OrderVideogames = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState();
  const orderBy = (event) => {
    event.preventDefault();
    dispatch(orderAllVideogames(event.target.selectedOptions[0].value));
    setOrder(`Ordenado por nombre: ${event.target.value}`);
  };
  return (
    <div>
      <select onChange={(e) => orderBy(e)} defaultValue="">
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
