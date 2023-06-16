import express from 'express';
import { v4 } from 'uuid';
import cors from 'cors';
import morgan from 'morgan';
import { postCreateValidation } from './validPost.js';
import { create, editPost, getAll, getOne, remove } from './controllers/PostConrollers.js';

const app = express();
const PORT = 3001;

export const DB = {
  posts: [
    {
      id: v4(),
      title: 'Моя статья',
      text: 'Повседневная практика показывает',
      subject: 'Tesla',
      author: 'Elon Musk',
    },
    {
      id: v4(),
      title: 'Моя вторая статья',
      text: 'что начало повседневной работы',
      subject: 'Apple',
      author: 'Steve Jobs',
    },
    {
      id: v4(),
      title: 'Моя третья статья',
      text: 'Книги этого автора очень легко читаются, и подача материала очень понятная',
      subject: 'It',
      author: 'Kyle Simpson',
    },
  ],
};

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', postCreateValidation, create);
app.put('/posts/:id', editPost);
app.delete('/todos/:id', remove);

app.listen(PORT, () => {
  console.log('Server ok!', PORT);
});
