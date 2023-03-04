const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB, sequelize } = require('./plugins/db');
const userRouter = require('./routes/user.route');
const noteRouter = require('./routes/note.route');

dotenv.config();
const app = express()
const port = 3000
const host = '0.0.0.0'
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('Todo REST Api!')
})
app.use('/api/v1', userRouter);
app.use('/api/v1', noteRouter);

app.listen(port, host, async () => {
    console.log(`Todo app listening on port ${port}!`)
    await connectDB()
    sequelize.sync({ force: false }).then(() => {
        console.log("Synced database successfully...");
      })
})