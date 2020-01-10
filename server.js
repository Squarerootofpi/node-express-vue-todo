const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

//create an array of all the items etc... in the todolist, and an id incrementer so each item has an id. 
let items = [];
let id = 0;

app.post('/api/items', (req, res) => {
  id = id + 1; //increment ID
  console.log(id); //The ID of the new object
  console.log(req); //This is all the stuff sent from the browser. A TON of stuff.
  console.log(req.body); //The .body is the req portion that was edited by the body-parser, easier for us to use. 
  let item = {
    id: id,
    text: req.body.text,
    completed: req.body.completed
  };
  items.push(item);
  res.send(item);
});

//sends items back...
app.get('/api/items', (req, res) => {
  res.send(items);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = items[index];
  item.text = req.body.text;
  item.completed = req.body.completed;
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

//This listens to port 3000

app.listen(3000, () => console.log('Server listening on port 3000!'));