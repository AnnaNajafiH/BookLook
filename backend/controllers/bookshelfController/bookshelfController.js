import Bookshelf from "../../models/bookshelf/bookshelf.js";
import createError from "http-errors";
import {v4 as uuidv4} from "uuid";


//==========================================================================
// Create a bookshelf
//==========================================================================
export const createBookshelf = async(req, res, next)=>{
    const {
        image, 
        name,
        country,
        state,
        city,
        zipCode,
        street,
        longitude,
        latitude,
        openingTime,
        closingTime
    }=req.body;

    if (!name || !country || !state || !city || !street) {
    return next(createError(400, "Name, country, state, city, and street are required."));

  }
    try {
        const barcode= uuidv4();
       
        const newBookshelf= new Bookshelf({
            barcode,
            image,
            name,
            country,
            state,
            city,
            zipCode,
            street,
            longitude,
            latitude,
            openingTime,
            closingTime
        });
        await newBookshelf.save();

        return res.status(201).json({
            success: true,
            message: "Bookshelf created successfully",
            newBookshelf
        });

    } catch (error) {
        return next (createError(500, "Server error! Please try again!"));
    }
}

//==========================================================================
// Update bookshelf
//==========================================================================

export const updateBookshelf = async (req, res, next) => {
  const { id } = req.params;
  const {
    image,
    name,
    country,
    state,
    city,
    zipCode,
    street,
    longitude,
    latitude,
    openingTime,
    closingTime,
  } = req.body;

    try {
        const updatedBookshelf = await Bookshelf.findByIdAndUpdate (
            id, 
            {
              $set :{
                image,
                name,
                country,
                state,
                city,
                zipCode,
                street,
                longitude,
                latitude,
                openingTime,
                closingTime
                },
            },
            {
                new: true,   //Return the updated document instead of the original one.
                runValidators: true,   //Ensures that Mongoose validates the data against your schema rules before updating.
            }
        );

        if (!updatedBookshelf){
            return next(createError (404, "Bookshelf not found!"))
        }

         res.status(200).json({
            success: true, 
            message: "Bookshelf successfully updated",
            data:updatedBookshelf,
        })
    } catch (error) {
        console.error(error);
        return next(createError(500, "Server error! Please try again!"))
    }
 }

//==========================================================================
// Get all bookshelves
//==========================================================================

export const getBookshelves = async (req, res, next) =>{
    try {
        const {search , page} = req.query;

        if (page && page){       // Check if page exist , is the same as if (page) {...}
            const bookshelves = await Bookshelf.find()
            .limit(12)
            .skip ((page -1) * 12)

            if (!bookshelves){
                return next(createError (400, "Bookshelves not found"));
            };
            
            return res.status(200).json({
                success: true,
                result: bookshelves,
            });
        };

        let query = {};
        if (search){
            query={
                $or:[
                    {name: new RegExp (search, "i")},
                    {country: new RegExp (search, "i")},
                    {state: new RegExp (search, "i")},
                    {city: new RegExp (search, "i")},
                ],
            };
        };

        const bookshelves = await Bookshelf.find(query);
        if (!bookshelves || bookshelves.length === 0) {
            return next(createError (400, "Bookshelves not found!"));
        }
        return res.status(200).json({
            success: true,
            result: bookshelves,
        });

    } catch (error) {
        console.error('Error in getBookshelves:', error);  // Log the error
        return next(createError(500, "Server error! Please try again"))
    }
}

//==========================================================================
// Get single bookshelf
//==========================================================================

export const getBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!bookshelf) {
      return next(createError(400, "Bookshelf does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: bookshelf,
    });

  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// delete single bookshelf
//==========================================================================

export const deleteBookshelf = async (req, res, next) => {
  const { id: bookshelfId } = req.params;   //or const bookshelfId = req.params.id;
  

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);

    if (!bookshelf) {
      return next(createError(404, "Bookshelf not found"));
    }

    await Bookshelf.findByIdAndDelete(bookshelfId);

    return res.status(200).json({
      success: true,
      message: "Bookshelf has been successfully deleted",
    });
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

//==========================================================================
// Get all books inside bookshelf 
//==========================================================================

export const getAllBooksInBookshelf = async (req, res, next) => {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId)
      .populate({ path: "books", model: "Book" })
      .populate({ path: "borrowedBooks", model: "Book" })
      .populate({ path: "donatedBooks", model: "Book" });

    if (!bookshelf) {
      return next(createError(400, "Bookshelf not found!"));
    }

    const { books, donatedBooks, borrowedBooks } = bookshelf;

    res.status(200).json({
      success: true,
      books,
      donatedBooks,
      borrowedBooks,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Total Number of bookshelves
//==========================================================================

export const countBookshelves = async (req, res, next) => {
  try {
    const bookshelvesCount = await Bookshelf.countDocuments();

    res.status(200).json({
      success: true,
      count: bookshelvesCount,
    });
  } catch (error) {
    next(createError(400, "Server error! Please try again!"));
  }
};
