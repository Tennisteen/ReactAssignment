import React, { useState, useEffect } from 'react';
import "./App.css"

const Filter = ({items}) => {
    // console.log(items)
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(null)
    const [options, setOptions] = useState({
      name: false,
      description: false,
      image: false,
    })

      const handleChange = (e) => {
        setSearch(e.target.value);
      }
    
      const handleFilter = (e) => {
        setOptions((state) => ({
          ...state,
          [e.target.name]: e.target.checked,
        }))
      }

      useEffect(() => {
        filter()
      }, [search, options])

      const filter = () => {
        const list =items && items.filter((item) => {
          return (
            (options.name && item.login.toLowerCase().includes(search.toLowerCase())) ||
            (options.description && item.type.toLowerCase().includes(search.toLowerCase())) ||
            (options.image && item.avatar_url.toLowerCase().includes(search.toLowerCase())))
        });
        setResult(list);
      };

      
  return (
    <div>
        <h1>Question 2</h1>
          <p>Search Here</p>
          <input type="text" placeholder="Enter value" value={search} onChange={handleChange} className='search-input'/>
          <div className='text-search'>Select the value by which you want to search </div>

          <div className='options'>
            <div>
          <input type="checkbox" name="name" checked={options.name} onChange={handleFilter}/>
           <span>Name: </span>
           </div>
           <div>
           <input type="checkbox" name="description" checked={options.description} onChange={handleFilter}/>
           <span>Description:</span>
           </div>
           <div>
          <input type="checkbox" name="image" checked={options.image} onChange={handleFilter}/>
          <span>Image:</span>
          </div>
          </div >
          <div className='item-container'>
                {
                result.map((item) => (
                <div key={item.id} className='cards'> 
                    <div>Name : {item.login}</div>
                    <div>Description : {item.type}</div>
                    <img src={item.avatar_url} alt="img of user" className='image'/>
                </div>
                ))}
         </div>
    </div>
  )
}

export default Filter