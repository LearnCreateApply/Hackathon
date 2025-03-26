const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'templates/home.html'))
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname,'templates/signup.html'))
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname,'templates/login.html'))
})
app.post('/signupsubmit',(req,res)=>{
    const { Fullname,username, password,phone,location } = req.body;
    fs.appendFileSync('signuplog.txt', `FullName:${Fullname} UserName:${username} Password:${password} Phone no.:${phone} Location:${location}\n`);  
    res.render('userdashboard',{Fullname:Fullname,username:username,phone:phone,location:location})
    // res.sendFile(path.join(__dirname,'view/userdashboard.ejs'))
})
app.post('/loginsubmit',(req,res)=>{
    const { username, password } = req.body;
    res.sendFile(path.join(__dirname,'templates/userdashboard.html'))
    fs.appendFileSync('loginlog.txt', `UserName:${username} Password:${password}\n`);  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})