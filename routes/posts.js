const express = require('express')
const PostController = require('../controllers/PostController')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.post('/', authentication, PostController.create)
router.get('/',PostController.getAll)
router.get('/id/:_id',PostController.getById)
router.get('/search/:name',PostController.getPostsByTitle)
router.delete('/id/:_id',authentication,PostController.delete)
router.put('/id/:_id',authentication,PostController.update)
router.put("/review/:_id", authentication, PostController.insertComment);
router.put('/likes/:_id', authentication, PostController.like);
router.put('/dislikes/:_id', authentication, PostController.dislike);

module.exports = router;