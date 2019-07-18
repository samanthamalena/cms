var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Message.find()
    .populate('group')
    .then(messages => {
        res.status(200).json({
            message: 'Messages fetched successfully',
            messages: messages
        });
    })
    .catch(error => {
        returnError(res, error);
    });
}
);

router.post('/', (req, res, next) => {
    const maxMessageId =sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                document: createdMessage
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.param.id })
        .then(message => {
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

        Contact.updateOne({ id: req.params.id }, contact)
            .then(result => {
                res.status(204).json({
                    message: 'Contact updated successfully'})
                })
                .catch(error => {
                    returnError(res, error);
                });
            })
        .catch(error => {
            res.status(500).json({
                message: 'Contact not found.',
                error: {contact: 'Contact not found'}
            });
        });
    });

    router.delete("/:id", (req, res, next) => {
        Contact.findOne({ id: req.params.id})
    });

    module.exports = router;
