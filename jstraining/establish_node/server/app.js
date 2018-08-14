const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
const router = express.Router();
const date = new Date();

router.use((req, res, next) => {
  console.log('There is a requesting.');
  console.log(`requested time is ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()} ${date.getMilliseconds()}`);
  next();
});

router.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

router.get('/:name', (req, res) => {
  res.send(`<h1>hello ${req.params.name}</h1>`);
});

router.post('/', (req, res) => {
  const name = req.body.name;
  res.json({ message: `Hello ${name}` });
});

app.use('/home', router);

app.listen(port);
console.log(`Magic happens on port ${port}`);
