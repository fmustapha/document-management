export default {
  search(req, res) {
    res.status(200)
    .json({
      status: 'success',
      message: 'What would you like to search for?'
    });
  }
};

