const express = require("express");

const userRoute = express();
const fs = require("fs");



userRoute.get("/all", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json({ users: data.users });
});

userRoute.post("/add", (req, res) => {
  let newData = req.body;
   req.body.id = Math.floor(Math.random() * 1000)
  let dbdata = fs.readFileSync("db.json", "utf-8");
  let parsedData = JSON.parse(dbdata);
  parsedData.users.push(newData);

  fs.writeFileSync("db.json", JSON.stringify(parsedData));
  res.send("User added")
});


userRoute.put('/update/:id' , (req,res) => {
    let data = JSON.parse(fs.readFileSync('db.json' , 'utf-8'))
    let flag  = false
    let updatedUsers = data.users.map((ele,i) => {
        if(ele.id == req.params.id){
            flag = true
            return {...ele, ...req.body}
    
        }else{
            return ele
        }
    })

    if(flag == false){
        res.send("User not found")
    }
    else{
        data.users = updatedUsers
        fs.writeFileSync('db.json' , JSON.stringify(updatedUsers))
        res.send("User updated")
    }
})

userRoute.delete("/delete/:id", (req, res) => {

  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
 
   let flag = false;
   let filteredUsers = data.users.filter((el, i) => {
     if (el.id != req.params.id) {
       flag = true;
       return el
     } 
   });
 //   console.log("up", updatedUsers)
   if (flag == false) {
     res.send("User not found");
   } else {
     data.users = filteredUsers;
     fs.writeFileSync("db.json", JSON.stringify(data));
     res.send("User deleted");
   }
 
});




module.exports = userRoute;
