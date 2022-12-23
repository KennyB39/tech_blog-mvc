const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/Blogs', blogRoutes);
router.use('/Comments', commentRoutes);
router.use('/Users', userRoutes);

module.exports = router;