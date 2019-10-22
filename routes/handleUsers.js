const router = require("express").Router();
const UserSchema = require("../schemes/userSchema");
const { registerSchema, loginValSchema } = require("../schemes/validationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/auth");

router.post("/register", async (req, res) => {
   const { fullname, email, nickName, password, phone, registerDate } = req.body;
   const { error } = registerSchema(req.body);
   if (error) return res.status(400).json(error.details[0].message);
   const checkIfEmailIsExist = await UserSchema.findOne({ email });
   if (checkIfEmailIsExist) return res.status(400).json("Email already exist");

   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(password, salt);

   const newUser = new UserSchema({
      fullname,
      email,
      nickName,
      password: hashedPass,
      phone,
      registerDate
   });
   try {
      const createdUser = await newUser.save();
      res.status(200).json("your account has been successfully created");
   } catch (err) {
      res.status(400).json(err);
   }
});
router.post("/login", async (req, res) => {
   const { email, password } = req.body;
   const { error } = loginValSchema(req.body);
   if (error) return res.status(400).json(error.details[0].message);
   const user = await UserSchema.findOne({ email });
   if (!user) return res.status(400).json("Wrong email or password");
   const comparePass = await bcrypt.compare(password, user.password);
   if (!comparePass) return res.status(400).json("Wrong email or password");
   const token = jwt.sign({ _id: user._id }, process.env.USER_TOKEN, { expiresIn: 9000 });
   res.json({
      token,
      id: user._id,
      user: {
         userID: user._id,
         fullname: user.fullname,
         nickName: user.nickName,
         email: user.email,
         phone: user.phone,
         registerDate: user.registerDate,
         isAdmin: user.isAdmin
      }
   });
});
router.get("/:id", verify, (req, res) => {
   const { id } = req.params;
   UserSchema.findById(id, (err, data) => {
      if (err) res.status(404);
      else res.json(data);
   }).select("-password");
});
router.put("/:id", verify, async (req, res) => {
   const { id } = req.params;
   const { password, newPassword } = req.body;
   if (!password) return res.json("You need to enter your password");
   const user = await UserSchema.findOne({ _id: id });
   const comparePass = await bcrypt.compare(password, user.password);
   if (!comparePass) return res.status(400).json("Wrong password");
   let data = req.body;
   if (data["newPassword"]) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(newPassword, salt);
      data["password"] = hashedPass;
      delete data["newPassword"];
   } else {
      delete data[("newPassword", "password")];
   }

   Object.entries(data).forEach(([key, value]) => {
      if (!value) delete data[key];
   });
   UserSchema.updateOne({ _id: id }, data, err => {
      if (err) return res.status(404).json("Not Found");
      res.status(200).json("Your data has been updated");
   });
});
router.delete("/delete/:id", (req, res) => {
   const { id } = req.params;
   UserSchema.deleteOne({ _id: id }, err => {
      if (err) return res.status(404).json("Something went wrong");
      return res.status(200).json("You removed your account");
   });
});

module.exports = router;
