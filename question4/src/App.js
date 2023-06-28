import React, { useState, useEffect } from 'react';
import {AiOutlineDislike} from "react-icons/ai"
import {AiOutlineLike} from "react-icons/ai"
import "./App.css"
const App = () => {

  const [users, setUsers] = useState()
  const [votes, setVotes] = useState({})
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('https://api.github.com/users');
      const usersData = await response.json();
      setUsers(usersData);
      handleVotes(usersData);
    } catch (err) {
      console.log(err);
    }
  }

  function handleVotes (usersData){
    const initialVotes = {};
    usersData.forEach((user) => {
      initialVotes[user.id] = { upVotes: 0, downVotes: 0 }
    })
    setVotes(initialVotes);
  }

  function handleUpvote (id){
    setVotes((state) => ({
      ...state,
      [id]: {
        ...state[id],
        upVotes: state[id].upVotes + 1,
      }
    }))
  }

  function handleDownVotes(id){
    setVotes((state) => ({
      ...state,
      [id]: {
        ...state[id],
        downVotes: state[id].downVotes + 1,
      }
    }))
  }

  return (
    <>
    <h1>Question 4</h1>
    <div className="container">
       {
        users && users.map((items)=>{
          return (
            <ul className='item' key={items.id}>
              <li>Name :-</li>
              <p>{items.login}</p>
              <li>Description :-</li>
              <p>{items.type}</p>
              <li>Image :-</li>
              <img src={items.avatar_url} alt='Img' className='image'/>
              <div className='overall'>
              <div className='votes'>
              <div>{votes[items.id]?.upVotes || 0}</div>
              <AiOutlineLike className='icons' onClick={() => handleUpvote(items.id)}/>
              </div>
              <div className='votes'>
              <div>{votes[items.id]?.downVotes || 0}</div>
              <AiOutlineDislike className='icons' onClick={() => handleDownVotes(items.id)} />
              </div>
              </div>
            </ul>
          )
        })
       }
    </div>
    </>
  )
}

export default App