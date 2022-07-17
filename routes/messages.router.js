const express = require('express');
const multer=require('multer');
const passport = require('passport');
const router = express.Router();
const { ValidatorSchemaHandler } = require('../middlewares/validator.handler');
const {
  sendMessageSchema,
  idValidation,
  updateMessageSchema,
  filterMessageSchema
} = require('../Schemas/message.schema');
const MessageService = require('../services/messages.services');

const upload=multer({
  dest:'./public/files/'
});
const messageService = new MessageService();
router.get('/',
  async (req, res, next) => {
    await messageService.listAllMessages(req.query)
          .then(response => {
            res.status(200).json(response);
          })
          .catch(err => next(err));
});

router.post(
  '/',
  ValidatorSchemaHandler(sendMessageSchema, 'body'),
  async (req, res, next) => {
    await messageService.sendMessage(req.body)
    .then((response)=>{
      res.status(201).json(response);
    })
    .catch(err=>next(err));
  }
);
router.patch(
  '/:id',
  ValidatorSchemaHandler(idValidation, 'params'),
  ValidatorSchemaHandler(updateMessageSchema, 'body'),
  async (req, res, next) => {
    try {
      const response = await messageService.updateMessage(
        req.params.id,
        req.body.message
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
    ValidatorSchemaHandler(idValidation, 'params'),
    async (req, res, next) => {
        await messageService.deleteMessage(req.params.id)
              .then(response=>{
                res.status(200).json({message: "deleted"});
              })
              .catch(err=>next(err))
    }
)
module.exports = router;
