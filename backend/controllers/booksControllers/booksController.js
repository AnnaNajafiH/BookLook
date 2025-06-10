import Book from '../../models/book/book.js';
import createError from 'http-errors';
import Bookshelf from '../../models/bookshelf/bookshelf.js';


//=========================================================================================================
// Create a new book
//=========================================================================================================

export const createBook = async(req, res, next)=>{
    const {
        title,
        author,
        coverImageUrl,
        language,
        summary,
        bookshelf: shelfId,
    }= req.body;


if (!title | !author | !shelfId){
    return res.status(400).json({message: 'Title, author and bookshelfId are required'});
}

try {
    const newBook = new Book({
        title,
        author,
        coverImageUrl,
        language,
        summary,
        bookshelf: shelfId,  
    })


const savedBook = await newBook.save();


const bookshelf = await Bookshelf.findById(shelfId);
if (!bookshelf){return res.status(404).json({message: 'Bookshelf not found'})}

bookshelf.books.push(savedBook._id);
await bookshelf.save();

res.status (201).json({
    success: true,
    message: "Book created and added to bookshelf successfully",
    book:savedBook,
});

} catch (error) {
    console.error("Error creating book", error);
    return next(createError(500, "Server error! please try again!"));
}
};

//==========================================================================
// Update book to add author/s
//==========================================================================

export const updateBook = async (req, res, next) => {
  const { 
    bookId, 
    firstName, 
    lastName, 
    birthDate, 
    deathDate } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return next(createError(400, "Book does not exist!"));
    }

    const author = {
      firstName,
      lastName,
      birthDate,
      deathDate,
    };

    book.author = author;

    await book.save();

    return res.status(200).json({
      success: true,
      result: book,
      message: "Book author is successfully added.",
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get all books
//==========================================================================

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

   if (books.length === 0) {
      return next(createError(404, "No books found!"));
    }

    return res.status(200).json({
      success: true,
      result: books,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single book
//==========================================================================

export const getBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return next(createError(400, "Book does not exist!"));
    }

    return res.status(200).json({
      success: true,
      message: "Book found successfully", 
      result: book,
    });

  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// delete a single book
//==========================================================================

export const deleteBook = async (req,res,next)=>{
    const bookId=req.params.id;

    try {
        const book = await Book.findByIdAndDelete(bookId);
        if (!book){
            return next(createError(404, "Book not found"));
        }
        return res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            result: book,
        });
    } catch (error) {
        return next (createError(400, "Server error! Please try again!"));
    }
}

//==========================================================================
// Count all books
//==========================================================================

export const countBooks = async (req, res, next) => {
  try {
    const count = await Book.countDocuments();

    return res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error("Error counting books:", error);
    return next(
      createError(500, "Failed to count books. Please try again later.")
    );
  }
};


//==========================================================================
// update a book by adding a given rating
//==========================================================================

export const updateBookRating = async (req, res, next) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.ratings.push(rating);
    await book.save();

    const averageRating =
      book.ratings.reduce((acc, rating) => acc + rating, 0) / book.ratings.length;

    res.status(200).json({
      success: true,
      book,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//==========================================================================
// read (get) a book's rating
//==========================================================================

export const getBookRating = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const averageRating =
      book.ratings.length > 0
        ? book.ratings.reduce((acc, rating) => acc + rating, 0) /
          book.ratings.length
        : 0;

    res.status(200).json({
      success: true,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
