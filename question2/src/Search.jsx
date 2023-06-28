import React, { useState, useEffect } from 'react';

const FilteredList = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    name: true,
    description: true,
    image: true,
  });
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    filterItems();
  }, [searchTerm, filterOptions]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const filterItems = () => {
    const filtered = items.filter((item) => {
      const nameMatch = filterOptions.name && item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = filterOptions.description && item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const imageMatch = filterOptions.image && item.image.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || descriptionMatch || imageMatch;
    });
    setFilteredItems(filtered);
  };

  return (
    <div>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchTermChange} />
      <div>
        <label>
          Name:
          <input
            type="checkbox"
            name="name"
            checked={filterOptions.name}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Description:
          <input
            type="checkbox"
            name="description"
            checked={filterOptions.description}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Image:
          <input
            type="checkbox"
            name="image"
            checked={filterOptions.image}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <img src={item.image} alt={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredList;
