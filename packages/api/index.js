const express = require('express');
const R = require('ramda');

const app = express();

const generateNumber = (min = 1, max = 100) => {
  const range = max - min;
  return Math.floor(Math.random() * range + min);
};

const generateSequence = count =>
  R.uniq(
    R.until(
      R.compose(
        R.equals(count),
        R.length,
        R.uniq,
      ),
      arr => [...arr, generateNumber()],
      [],
    ),
  );

app.get('/cards/:amount', (req, res) =>
  res
    .header('Access-Control-Allow-Origin', '*')
    .json(generateSequence(Number(req.params.amount))),
);

app.listen(process.env.PORT, () =>
  console.log(`API listening on port ${process.env.PORT}!`),
);
