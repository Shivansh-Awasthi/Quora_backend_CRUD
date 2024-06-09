const { escapeXML } = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");



app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));



app.set("view engine", "ejs");
app.set("views,", path.join(__dirname, "views")),
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "shivansh",
        content: "Hey, ask me anything..."
    },
    {
        id: uuidv4(),
        username: "rohan",
        content: "Just check it out tthis new website its awsome🔥"
    },
    {
        id: uuidv4(),
        username: "irina",
        content: "i love to spend my time with pets ❤️."
    }
];


app.get("/",(req, res) => {
    res.render("index.ejs",{posts})
});

app.get("/new", (req,res)=> {
    res.render("new.ejs");
})

app.post("/",(req,res)=> {
    let {username, content} = req.body;
    let id = uuidv4(); 
    posts.push({id,username,content}) 
    res.redirect("/")
});

app.get("/:id",(req,res)=> {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post})
})

app.patch("/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/")
});

app.get("/:id/edit",(req, res) =>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
}); 


app.delete("/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/")
}) 

app.listen(port, ()=>{
    console.log(`Server is running on port: ${3000}`)
})
