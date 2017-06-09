const validateSignup = (req, res, next) => {
  const {
    username,
    firstname,
    lastname,
    email,
    password,
    roleId
  } = req.body;

  if (!username) {
    return res.status(400).json({
      message: 'enter a valid username'
    });
  }

  if (!firstname) {
    return res.status(400).json({
      message: 'enter a valid firstname'
    });
  }

  if (!lastname) {
    return res.status(400).json({
      message: 'enter a valid lastname'
    });
  }

  if (!email) {
    return res.status(400).json({
      message: 'enter a valid email address'
    });
  }

  if (!password) {
    return res.status(400).json({
      message: 'password must be a minimum of 8 characters'
    });
  }

  if (parseInt(roleId, 10) === 1) {
    return res.status(400).json({
      message: 'you cant signup with that role'
    });
  }

  next();
};

export default validateSignup;
