let express = require('express')
let router = express.Router();
let Book = require('../../../model/Book');
let messageToClient = require('../../../utils/messages').messageToClient
router.get('/', async (req, res) => {
    let page = req.query.page;
    let limit = req.query.size;
    let search=req.query.search;
    let sort=req.query.sort;
    let query = {};
    if(search&&search.length>2){
      query.$text= {$search: search}
    }
    
    let options = {
        page: 1,
        limit: 10,
        select: "-createdAt -updatedAt -__v",
        sort: { "updatedAt": sort},

    };
    if (Number(page) && page > 1) { options.page = page }
    if (Number(limit) && limit > 1) { options.limit = limit }
    try {
        let books = await Book.paginate(query,options);
        res.status(200).json(messageToClient(true, 'books', books))
    } catch (error) {
        console.log(error)
        res.status(500).json(messageToClient(false, 'internal_error', {}))
    }
})
router.post('/', (req, res, next) => {
    let { title, author, categories } = req.body;
    if (!title || title.length < 3) { return res.json(messageToClient(false, 'title_is_required', {})) }
    if (!author || author.length < 3) { return res.json(messageToClient(false, 'author_is_required', {})) }
    if (!categories || categories.length < 3) { return res.json(messageToClient(false, 'categories_is_required', {})) }
    next();
})

router.post('/', async (req, res) => {
    try {
        let book = new Book(req.body);
        await book.save();
        res.status(200).json(messageToClient(true, 'saved', {}))

    } catch (error) {
        console.log(error)
        if(error.code==11000){
            res.status(500).json(messageToClient(false, 'title_is_duplicate', {}))

        }else{
            res.status(500).json(messageToClient(false, 'internal_error', {}))

        }
    }
})

module.exports = router;
