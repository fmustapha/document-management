import express from 'express';

const app = express();

app.use('/', (req, res) => {
  res.send('home');
});

app.listen(5000, () => {
  console.log('server started');
});
