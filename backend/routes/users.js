const express = require("express");
const router = express.Router();

const Person = require("../models/registration.model");

router.get("/", (req, res) => {
  const info = {
    alert: "",
  };
  const info1 = {
    alert: "",
  };
  Person.find({})
    .select("-password")
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
      info.alert = "Something went wrong";
      return res.status(400).json(info.alert);
    })
    .catch((err) => {
      info1.alert = "Server error, please try one more time or later";
      return res.status(500).json(info1);
    });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const info = {
    alert: "",
  };
  Person.findByIdAndDelete({ _id: id }).exec((err, data) => {
    if (err) {
      info.alert = "Server error, please try later";
      return res.status(500).json(info);
    } else {
      if (!data) {
        info.alert = "User doesn't exist";
        return res.status(400).json(info);
      }
      const info1 = {
        success: "",
      };
      info1.success = `User ${data.name} removed successfully`;
      return res.status(200).json(info1);
    }
  });
});

module.exports = router;

// Course.findByIdAndDelete({ _id: id }, (err, data) => {
//   const info3 = {
//     alert: "Server error,can't delete during remove course by admin",
//   };
//   if (err) {
//     return res.status(500).json(info3);
//   } else {
//     const info4 = {
//       success: "Course removed succesfully!",
//     };

//     return res.status(200).json(info4);
//   }
// });
