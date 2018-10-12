
import * as express from 'express';

const app = express();

app.get('/movies', (req, res) => {

  res.json({
    data: []
  });
});

export default app;
