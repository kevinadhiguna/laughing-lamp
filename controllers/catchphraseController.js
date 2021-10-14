/**
 * THE CONTROLLER FILE CONTAINS THE LOGIC USED TO QUERY DATABASE (In this case, MongoDB).
 */

const Catchphrase = require('../models/catchphrase');

// Get all catchphrases
async function getAllCatchphrases(search, reqPage, reqLimit) {
    let options = {};

    if (search) {
        options = {
            ...options,
            $or: [
                {
                    movieName: new RegExp(search.toString(), 'i')
                },
                {
                    catchphrase: new RegExp(search.toString(), 'i')
                }
            ]
        }
    }

    let total = Catchphrase.countDocuments(options);
    let page = parseInt(reqPage) || 1;
    let limit = parseInt(reqLimit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total) / limit);

    if (last_page < 1 && total > 0) {
        last_page = 1;
    }

    try {
        const catchphrases = await Catchphrase.find(options).skip((page - 1) * limit).limit(limit);
        return {
            success: true,
            data: catchphrases,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString(),
        };
    } catch (err) {
        return {
            success: false,
            message: "Catchphrases not found...",
        };
    }
}

// Get a specific catchphrase
async function getCatchphraseById(id) {
    let catchphrase;
    
    try {
        catchphrase = await Catchphrase.findById(id);

        if (catchphrase == null) {
            return {
                success: false,
                message: "Can not find the catchphrase..",
            };
        }
    } catch (err) {
        return {
            success: false,
            message: `Oops.. something wrong : ${err.message}`,
        };
    }

    return {
        success: true,
        data: catchphrase,
    };
}

// Add a new catchphrase
async function addCatchphrase (body) {
    const catchphrase = new Catchphrase(body);

    try {
        const newCatchphrase = await catchphrase.save();

        return {
            success: true,
            data: newCatchphrase,
        };
    } catch (err) {
        return {
            success: false,
            message: `Sorry, failed to add the new catchphrase... try again later. Error : ${err.message}`,
        };
    }
}

// Update a catchphrase
async function updateCatchphrase (id, movieName=null, reqCatchphrase=null, movieContext=null) {
    let catchphrase;

    try {
        catchphrase = await Catchphrase.findById(id);

        if (catchphrase == null) {
            return {
                success: false,
                message: "Can not find the catchphrase...",
            };
        }

        if (movieName != null) {
            catchphrase.movieName = movieName;
        }

        if (reqCatchphrase != null) {
            catchphrase.catchphrase = reqCatchphrase;
        }

        if (movieContext != null) {
            catchphrase.movieContext = movieContext;
        }

        try {
            const updatedCatchphrase = await catchphrase.save();

            return {
                success: true,
                data: updatedCatchphrase,
                message: "Catchphrase has been updated successfully",
            };
        } catch (err) {
            return {
                success: false,
                message: "Failed to update the catchphrase",
            };
        }
    } catch (err) {
        return {
            success: false,
            message: `Oops.. something went wrong when updating the catchphrase : ${err.message}`,
        };
    }
}

// Remove a catchphrase
async function removeCatchphrase(id) {
    let catchphrase;

    try {
        catchphrase = await Catchphrase.findById(id);

        if (catchphrase == null) {
            return {
                success: false,
                message: "Can not find the catchphrase...",
            };
        }

        try {
            await catchphrase.remove();

            return {
                success: true,
                message: "Successfully deleted the catchphrase !",
            };
        } catch (err) {
            return {
                success: false,
                message: `Failed to remove the catchphrase. Error : ${err.message}`,
            };
        }
    } catch (err) {
        return {
            success: false,
            message: `Oops.. something went wrong when attempting to remove the catchphrase. Error : ${err.message}`,
        };
    }
}

// Export all the functions
module.exports = {
    getAllCatchphrases,
    getCatchphraseById,
    addCatchphrase,
    updateCatchphrase,
    removeCatchphrase
};
