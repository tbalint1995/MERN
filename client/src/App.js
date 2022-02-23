import React, {useEffect, useState} from "react";
import './App.css';
import Axios from 'axios' ;

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) =>  {
      setFoodList(response.data);
    
    //console.log(response);
    });//kiolvasom az adatokat
  }, []);


  const addToList = () => {
    Axios.post("http://localhost:3001/insert",  {
      foodName: foodName, 
      days: days,
    });//elküldtem az adatokat 
    //console.log(foodName + days);
  };


    const updateFood = (id) => {
      Axios.put("http://localhost:3001/update", {
        id: id,
        newFoodName: newFoodName,
      }); 
    };

    const deleteFood = (id) => {
      Axios.delete(`http://localhost:3001/delete/${id}`); 
    };

    
  return (
    <div className="App">
      <h1> App with Mern</h1>

      <label>Food Name:</label>
      <input type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      ></input>
      <label>Days Since You Ate It::</label>
      <input 
      type="number"
      onChange={(event) => {
          setDays(event.target.value);
        }}
      ></input>
      <button onClick={addToList}>Add To List</button>

      <h1> Food List</h1>
      {foodList.map((val, key) => {
        return (
        <div key={key} className="food"> 
            <h1>{val.foodName}</h1> <h1>{val.daysSinceIAte}</h1>
            <input 
            type="text" 
            placeholder="New Food Name ..." 
            onChange={(event) => {
              setNewFoodName(event.target.value);
            }}
            />
            <button onClick={() => updateFood(val._id)}> UpdateFood </button>
            <button onClick={() => deleteFood(val._id)}> Delete </button>
        </div>
        );
      })}
    </div>
  );
}

export default App;
 
/* A kliens és szerver elkülőnítése a jobb megértést szolgálja. 

Töltsd le ->  MongoDB Compass -> Teremtsd meg a kapcsolatot.
client -> 
npx create my app
npm start


server ->
npm init
npm install express mongoose
node index.js
(kill the server visual studio)
npm run balintStart -> (package.json) 
npm install cors
npm install dotenv
*/
