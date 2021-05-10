const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js")

const items = ["Buy Food", "Eat Food", "Cook Food"]
const workItems = []

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));


app.listen(3000, function(){
    console.log("Server started on port 3000")
})
app.set("view engine", "ejs");


app.get("/", function(req,res){
    let day = date.getDate()
    res.render("list", {listTitle : day, newListItem: items})
})

app.post("/", function(req, res){
    const item = req.body.newItem;

    if (req.body.list ===  "Work"){
        workItems.push(item);
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }
})

app.get('/work', function(req, res){
    res.render("list", {listTitle: "Work List", newListItem: workItems})
})

