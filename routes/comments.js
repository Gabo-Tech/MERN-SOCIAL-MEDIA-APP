const express = require('express')
const CommentController = require('../controllers/CommentController')
const { authentication, isAuthor } = require('../middlewares/authentication')
const router = express.Router()

router.post('/:_id',authentication, CommentController.create)
router.put('/:_id',authentication,isAuthor, CommentController.update)

module.exports = router;