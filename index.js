const express = require('express')
const bodyParser = require("body-parser");
const db = require("./models/");
const session = require('express-session')
const app = express()
const port = 3000
app.use(express.json());



app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'practico 1 web-2'
}))

db.sequelize.sync({
     // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});


require("./routes")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
