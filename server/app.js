import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import {
  addComment,
  create,
  editPost,
  getAll,
  getOne,
  remove,
} from './controllers/PostConrollers.js';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', create);
app.put('/posts/:id', editPost);
app.post('/posts/comment/:id', addComment);
app.delete('/posts/:id', remove);

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
