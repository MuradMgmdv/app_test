import express from 'express';
import { v4 } from 'uuid';
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

export const DB = {
  posts: [
    {
      id: v4(),
      title: 'Моя статья',
      text: 'Книги этого автора очень легко читаются, и подача материала очень понятная',
      subject: 'It',
      author: 'Kyle Simpson',
      comments: [],
      atCreated: Date.now(),
    },
    {
      id: v4(),
      title: 'Моя вторая статья',
      text: 'Utilizes Sass for a modular and customizable architecture. Import only the components you need, enable global options like gradients and shadows, and write',
      subject: 'Apple',
      author: 'Steve Jobs',
      comments: ['Ну бред же полный', 'Какой-то школьник видимо писал', 'Я бы смог лучше'],
      atCreated: Date.now(),
    },
    {
      id: v4(),
      title: 'Моя третья статья',
      text: 'Utilizes Sass for a modular and customizable architecture. Import only the components you need, enable global options like gradients and shadows, and write your own CSS with our variables, maps, functions, and mixins.',
      subject: 'Tesla',
      author: 'Elon Musk',
      comments: ['Ну бред же полный', 'Какой-то школьник видимо писал'],
      atCreated: Date.now(),
    },
  ],
};

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
