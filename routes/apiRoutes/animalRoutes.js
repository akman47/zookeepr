const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals.js');
const { animals } = require('../../data/animals');
const router = require('express').Router();

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// <route>/:<parameterName>, paramm route must come after the other get route
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

router.post('/animals/', (req, res) => {
    // req.body is where incoming content will be
    // console.log(req.body);
    
    // set id based on what the next index of array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    }
    else {
        // add animal to json file and animals array
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;