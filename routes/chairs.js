const router = require('express').Router()
const chairCtrl = require('../controllers/chairs.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, chairCtrl.index)
router.put('/:id/add-photo', checkAuth, chairCtrl.addPhoto)

module.exports = router
