import { body } from 'express-validator';

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 2 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 2 }).isString(),
  body('subject', 'Введите тему статьи').isLength({ min: 2 }).isString(),
  body('user', 'Введите имя').isLength({ min: 2 }).isString(),
];
