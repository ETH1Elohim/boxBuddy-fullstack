const express = require('express');
const db = require('../models');
const { render } = require('ejs');
const router = express.Router();
const auth = require('../auth'); //auth/index.js
const cloudinary = require('cloudinary').v2;


function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
}

router.get('/', auth,  async (req, res) => {

    try{

        let posts = await db.posts.findAll({
            include: [
                {
                    model: db.users,
                    required: true,
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: db.exercises,
                    required: true,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.render('index', {
            posts,
            formatDate
        })
    }
    catch (error){
        console.log(error);
        res.render('index', {
            error: 'An error occurred during the request.'
        })
    }
})

module.exports = router;
