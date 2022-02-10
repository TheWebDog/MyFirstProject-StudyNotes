const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/' , require('./routers/index'))

app.listen(3090)