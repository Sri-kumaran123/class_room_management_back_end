const express = require('express');
const CORS=require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const classRoute = require('./routes/classes');
const classWithuser = require('./routes/addclass');
const chatmsg = require('./routes/chatmsg');
const Assign = require('./routes/assignment');
const material = require('./routes/material');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(CORS());
app.use(express.json());
app.use(express.static('./public'));
app.use(authRoute);
app.use('/class',classRoute);
app.use('/uclass',classWithuser);
app.use('/chat',chatmsg);
app.use('/assignment',Assign);
app.use('/meterial',material);



const uri = "mongodb://localhost:27017/miniproject";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0" , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
