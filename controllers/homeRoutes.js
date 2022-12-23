const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all blogs
router.get('/', async(req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({
             plain: true 
            }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single blog
router.get('/blog/:id', async(req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blog = blogData.get({
             plain: true 
            });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all blogs from a single user
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({
                plain: true 
                });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET login

