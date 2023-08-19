const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

const languages = ["French","English","Hindi"];
const messages = ["Bonjour le monde","Hello world","Namastey sansar"];


app.use(express.static(__dirname));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/hello",(req,res)=>{
    try {
        const language = req.query.language;
        const index = languages.indexOf(language);
        if(index == -1) {
            return res.status(400).json({
                message:"The requested language is not supported."
            })
        }
        const message = messages[index];
        return res.status(200).json({
            message:{
                id:index + 1,
                msgText:message
            }
        })

    } catch (error) {
        res.status(400).json({
            
            message:"There was an error in the request."
        })
    }
   

})

app.listen(PORT,()=>{
    console.log("Running on port" + PORT);
})