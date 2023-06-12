const router = require('express').Router()
const chairCtrl = require('../controllers/chairs.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/

router.get('/', chairCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.put('/:id/add-photo', checkAuth, chairCtrl.addPhoto)
router.post('/', checkAuth, chairCtrl.createChair)
router.patch('/:chairId', checkAuth, chairCtrl.updateChair)
router.delete('/:chairId', checkAuth, chairCtrl.deleteChair)

module.exports = router
