import React, { useState } from 'react'
import "../App.css"

const AddList = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [listData, setListData] = useState([])
    function addDetails(e){
        e.preventDefault();
        setListData((listData)=>{
            const updatedList = [...listData,
            {
              name : name,
              description : description,
              image : imageURL
            }
        ]
            // console.log(updatedList)
            setName('')
            setDescription('')
            setImageURL('')
            return updatedList
        })
    }

    function removeDetails(index){
        const updatedList = listData.filter((ele, id)=>{
            return id!==index
        })
        setListData(updatedList)
    }

    function editDetails(index){
        const name = listData[index].name
        const description = listData[index].description
        const imageurl = listData[index].image
        setName(name)
        setDescription(description)
        setImageURL(imageurl)
        removeDetails(index)
    }
    function removeAll(){
        setListData([])
    }
  return (
    <>
      <h1>Question 3</h1>
      <div className="container">
        <div className='header'>
            Add About You 
        </div>
        <form className='contianer' onSubmit={addDetails}>
        <input type='text' placeholder='Add Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type='text' placeholder='Add Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input type='text' placeholder='Add Image URL' value={imageURL} onChange={(e)=>setImageURL(e.target.value)}/>
        <button className='btn'>Add</button>
        </form>
        <h3 className='header'>Here is the list :{")"}</h3>
        <div className='list-items'>
        {
            listData!=[] && listData.map((data, id)=>(<p key={id} className='list-item'>
                <div className='leftitems'>
                <div>Name : {data.name}</div>
                <div>Description : {data.description}</div>
                <div>Image :</div>
                <img src={data.image} alt='image' className='image'/>
                </div>
                <div className='rightbtn'>
                <button className='btn-list' onClick={()=>removeDetails(id)}>Remove</button>
                <button className='btn-list' onClick={()=>editDetails(id)}>Edit</button>
                </div>
                </p> 
            ))
        }
        </div>
         {listData.length>=1 && <button onClick={removeAll} className='btn-remove'>Remove All</button>}
         
      </div>
    </>
  )
}

export default AddList
