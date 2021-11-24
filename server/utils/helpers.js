module.exports = {
  checkPassword: function ({req}) {
    const passw = /^[A-Za-z]\w{7,14}$/;
    if (req.match(passw)) {
      return true;
    }
    return false;
  }
}
