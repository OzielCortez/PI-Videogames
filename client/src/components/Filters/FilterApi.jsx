const FilterApi = () => {
  const handleFilter = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <select name="" id="">
        <option value="All"></option>
        <option value="Api">Api</option>
        <option value="Db">Database</option>
      </select>
    </div>
  );
};

export default FilterApi;
