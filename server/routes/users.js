var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", (req, res, next) => {
  const predefineUsers = [
    {email:"abc@xyz.com", password:"123", admin:false, name:"regular user"},
    {email:"xyz@abc.com", password:"123", admin:true, name:"admin user"}
  ]

  const data = req.body
  const foundUser = predefineUsers.find(
    (u) => u.email === data.email && u.password === data.password
  );
  if (foundUser) {
    delete foundUser.password;
    res.send(foundUser);
  } else {
    res.send({
      error: "user not found"
    })
  }
});

module.exports = router;
