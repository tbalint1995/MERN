const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();

const FoodModel = require ("./models/Food");
const Food = require("./models/Food");
const { update } = require("./models/Food");

app.use(express.json());
app.use(cors());

const uName = process.env.uName 
const password = process.env.password
const server = process.env.server

const url = `mongodb+srv://${uName}:${password}@${server}/food?retryWrites=true&w=majority`
mongoose.connect( url, { useNewUrlParser: true });

 /*Illessze be a kapcsolati karakterláncot (SRV vagy Normál ) 
     Ne felejtse el betáplálni a jelszót + felhasználónevet
     SRV Record -> kapcsold ki!
    */


//elküldtem az adatokat 
app.post("/insert", async (req,res) => {

    const foodName = req.body.foodName
    const days = req.body.days

    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
    

    try {
        await food.save();
        res.send("insert data");
    } catch (err) {
        console.log(err);
    }
});


//kiolvasom az adatokat
app.get("/read", async (req, res) => {
FoodModel.find({}, (err, result) => {
         if(err) {
             res.send(err);
         }
         

         res.send(result);
     });
});

//frissítés
app.put("/update", async (req,res) => {

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

   
    try {
        await FoodModel.findById(id, (updateFood) => {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        });
    } catch (err) {
        console.log(err);
    }
});

// törlés .. 
app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});



app.listen(3001, () => {
    console.log("Server running on port 3001...");
});