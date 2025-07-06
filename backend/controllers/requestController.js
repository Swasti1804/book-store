const Request = require("../models/request");

exports.sendRequest = async (req, res) => {
  const { bookId } = req.params;
  const { type, message, toUser } = req.body;

  try {
    const newRequest = await Request.create({
      book: bookId,
      fromUser: req.user.id,
      toUser,
      type,
      message
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: "Request failed" });
  }
};

exports.getReceivedRequests = async (req, res) => {
  const requests = await Request.find({ toUser: req.user.id })
    .populate("book")
    .populate("fromUser", "name email");
  res.status(200).json(requests);
};

exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = await Request.findById(id);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = status;
  await request.save();
  res.status(200).json({ message: "Status updated" });
};
