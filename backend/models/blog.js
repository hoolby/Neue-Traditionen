const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

// TODO add methods to handle queries e.G. like e.G const findOne = (id) => { ... }

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      title: Joi.string().max(255).presence(presence),
      author: Joi.string().max(255).presence(presence),
      picture: Joi.string().max(255),
      text: Joi.string().presence(presence),
    }).validate(data, { abortEarly: false }).error;
  };


const create = ({ title, author, picture, text, date }) => {
    
    // TODO upload(optional image)

    return db
      .query(
        'INSERT INTO blog (title, author, picture, text, date) VALUES (?, ?, ?, ?, ?)',
        [title, author, picture, text, date]
      )
      .then(([result]) => {
        const id = result.insertId;
        return { id, title, author, picture, text, date };
      });
  };


const findLast = (numberOfPosts) => {
    let sql = 'SELECT * FROM blog ORDER BY id desc limit ?;';
    const sqlValues = [numberOfPosts];
  
    return db.query(sql, sqlValues).then(([posts]) => posts);
  };

// TODO add exports of methods to use in routes like e.G. module.exports = { findOne };
module.exports = {
    validate,
    create,
    findLast,
};