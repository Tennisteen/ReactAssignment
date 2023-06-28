import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users')
      const userData = await response.json()
      setUsers(userData)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
    <h1>Question 1</h1>
    <p>Displaying name , description , image of users</p>
    <div className="container">
       {
        users.map((items)=>{
          return (
            <ul className='item' key={items.id}>
              <li>Name :-</li>
              <p>{items.login}</p>
              <li>Description :-</li>
              <p>{items.type}</p>
              <li>Image :-</li>
              <img src={items.avatar_url} alt='Img' className='image'/>
            </ul>
          )
        })
       }
    </div>
    </>
  );
}

export default App;
