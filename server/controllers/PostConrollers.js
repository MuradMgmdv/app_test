import { DB } from '../app.js';

export const getAll = async (req, res) => {
  try {
    res.json(DB.posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const onePost = DB.posts.find((el) => el.id === req.params.id);
    res.json(onePost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const create = async (req, res) => {
  try {
    const newPost = {
      id: v4(),
      title: req.body.title,
      text: req.body.text,
      subject: req.body.subject,
      user: req.body.user,
    };
    DB.posts.push(newPost);
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const editPost = async (req, res) => {
  try {
    res.json(DB.posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось изменить статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    DB.todos = DB.todos.filter((todo) => todo.id !== req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};
