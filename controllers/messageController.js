const messageModel = require('../models/messageModel');
const BaseController = require('./baseController');

class MessageController extends BaseController {
  constructor(modelName, primaryKey) {
    super(modelName, primaryKey);
  }

  async create(req, res) {
    const data = req.body;
    try {
      const result = await messageModel.create(data);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getAll(req, res) {
    try {
      const result = await messageModel.findAll();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const result = await messageModel.findByPk(id);
      if (!result) {
        res.status(404).send('Not found');
      } else {
        res.json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async updateById(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await messageModel.update(data, { where: { id: id } });
      if (result[0] === 0) {
        res.status(404).send('Not found');
      } else {
        res.json({ message: 'Updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;
    try {
      const result = await messageModel.destroy({ where: { id: id } });
      if (result === 0) {
        res.status(404).send('Not found');
      } else {
        res.json({ message: 'Deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}

module.exports = new MessageController('messages', 'messageID');
