const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
require('./Database/DB.Connection');
const bodyParser = require('body-parser');
const User_Router = require('./Routes/User.Routes');
const Blog_Router = require('./Routes/Blog.Routes');
const cors = require('cors')



app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/user', User_Router);
app.use('/api/blog', Blog_Router);



     



app.listen(PORT, () => {
    console.log('Server is Running on Port', PORT);
})
