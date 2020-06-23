const express = require('express');
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8000;
const db = new Datastore({ filename: './data/db', autoload: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/top/:n', (req, res) => {
  db.find({},(err, docs) => {
    res.send(JSON.stringify(docs))
  });
});

app.post('/data', (req, res) => {
    try  {
        let date = new Date(req.body.date);
        let hw = parseInt(req.body.hw);

        res.status(200);
        db.find({},(err, docs) => {
          res.send(JSON.stringify(docs))
        });
    }
    catch (e) {
        console.log("Some error occured:" + e);
        res.status(500);
        res.send("Server error");
    } 
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

let homeworks = [
  {
    title: "HW1",
    deadline: new Date("2020-06-08T12:00:00"),
    points: 20,
    url: "https://docs.google.com/document/d/1J8tCZWJ4HKjAUFq613DuOr673ji5RiBnlWXP34PpGCU/edit?usp=sharing"
  },
  {
    title: "HW2",
    deadline: new Date("2020-06-17T12:00:00"),
    points: 20,
    url: "https://docs.google.com/document/d/1fLOiE7XnIws33WNT3FP7_z2-o4O00AfH5aJwyh7nUD4/edit?usp=sharing"
  }
];

function dbSetup(docs, db) {
  for (let doc of docs) {
      db.insert(doc, (err, newDoc) => {
          console.log('New doc added to db');
      });
  }
}
dbSetup(homeworks, db);

