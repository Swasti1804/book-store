const Book = require("../models/books");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, type, price, contactInfo, imageUrl, location } = req.body;

    const newBook = await Book.create({
      title,
      author,
      genre,
      type,
      price,
      contactInfo,
      imageUrl,
      owner: req.user.id,
      location
    });

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Book creation failed" });
  }
};

exports.getAllBooks = async (req, res) => {
  const books = await Book.find({ isAvailable: true }).populate("owner", "name email");
  res.status(200).json(books);
};

exports.getMyBooks = async (req, res) => {
  const books = await Book.find({ owner: req.user.id });
  res.status(200).json(books);
};

exports.getNearbyBooks = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;

    const books = await Book.find({
      isAvailable: true,
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], parseFloat(radius) / 6378.1]
        }
      }
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching nearby books" });
  }
};

exports.updateBookStatus = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.isAvailable = false;
    await book.save();
    res.status(200).json({ message: "Book marked as returned/sold" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
