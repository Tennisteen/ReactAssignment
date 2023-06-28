import { useEffect, useState } from 'react';
import './App.css';
import Filter from './Filter';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await fetch('https://api.github.com/users')
      const items = await response.json()
      setItems(items)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="App">
        <Filter items = {items}/>
    </div>
  );
}

export default App;
