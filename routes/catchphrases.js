/**
 * EACH REQUEST TO THE BACKEND IS EVENTUALLY EXECUTED BY A CONTROLLER.
 * THE ROUTE FILE MAPS A REQUEST FROM A CLIENT TO A CONTROLLER.
 */

const express = require("express");
const router = express.Router();

let { getAllCatchphrases, getCatchphraseById, addCatchphrase, updateCatchphrase, removeCatchphrase } = require("../controllers/catchphraseController");

// Get all catchphrases
router.get('/', async (req, res) => {
    let response = await getAllCatchphrases(req.query.s, req.query.page, req.query.limit);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

// Get a specific catchphrase
router.get('/:id', async (req, res) => {
    let response = await getCatchphraseById(req.params.id);
    res.json(response);
});

// Create a new catchphrase
router.post('/', async (req, res) => {
    let body = {
        movieName: req.body.movieName,
        catchphrase: req.body.catchphrase,
        movieContext: req.body.movieContext,
    };

    let response = await addCatchphrase(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

// Update a catchphrase
router.put('/:id', async (req, res) => {
    let movieName = null, catchphrase = null, movieContext = null;

    if (req.body.movieName) { movieName = req.body.movieName }
    if (req.body.catchphrase) { catchphrase = req.body.catchphrase }
    if (req.body.movieContext) { movieContext = req.body.movieContext }

    let response = await updateCatchphrase(req.params.id, movieName, catchphrase, movieContext);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

// Remove a catchphrase
router.delete('/:id', async (req, res) => {
    let response = await removeCatchphrase(req.params.id);

    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response);
    }
});

// Export router
module.exports = router;
