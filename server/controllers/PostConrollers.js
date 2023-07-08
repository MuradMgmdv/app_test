import { v4 } from 'uuid';
import { DB } from '../DB.js';

export const getAll = async (req, res) => {
  try {
    res.json(DB.posts);
  } catch (err) {
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
      author: req.body.author,
      comments: [],
      atCreated: req.body.atCreated,
    };
    DB.posts.push(newPost);
    res.json(newPost);
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const editPost = async (req, res) => {
  const editPost = req.body;
  try {
    const elementIndex = DB.posts.findIndex((item) => item.id === req.params.id);

    if (elementIndex !== -1) {
      DB.posts[elementIndex] = editPost;
    }
    res.json(req.body);
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось изменить статью',
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const elementIndex = DB.posts.findIndex((item) => item.id === req.params.id);
    if (elementIndex !== -1) {
      DB.posts[elementIndex].comments.push(req.body.comment);
    }
    res.json(req.body);
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось изменить статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    DB.posts = DB.posts.filter((el) => el.id !== req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};
