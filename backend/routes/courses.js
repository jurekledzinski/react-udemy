const express = require("express");

const router = express.Router();

const Course = require("../models/course.model");

router.get("/", (req, res) => {
  Course.find({}).exec((err, data) => {
    if (err) {
      console.log("Błąd podczas pobrania kursów z bazy danych");
      res.status(400).json("Error " + err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/add-new", (req, res) => {
  const {
    titleCourse,
    imagePath,
    priceCourse,
    authorCourse,
    onStock,
  } = req.body;

  let info = {
    alert: "",
  };

  if (!titleCourse && !imagePath && !priceCourse && !authorCourse && !onStock) {
    info.alert = "Please fill in all fields";
    return res.status(400).json(info);
  }

  if (
    !titleCourse ||
    !imagePath ||
    !priceCourse ||
    (!authorCourse && !onStock)
  ) {
    info.alert = "All fields have to be filled in";
    return res.status(400).json(info);
  }

  if (Boolean(!info.alert)) {
    Course.findOne({ title: titleCourse })
      .then((response) => {
        if (response) {
          info.alert = "Course is already added, add diffrent one";
          return res.status(400).json(info);
        } else {
          const course = {
            title: titleCourse,
            imagePath: imagePath,
            price: parseFloat(priceCourse),
            author: authorCourse,
            amount: onStock,
          };
          const newCourse = new Course(course);

          newCourse.save((err, data) => {
            if (err) {
              info.alert = "Server error,during saving database new course";
              return res.status(500).json(info);
            }
            console.log(data);
            const info2 = {
              success: "Course added succesfully!",
              course: data,
            };

            return res.status(200).json(info2);
          });
        }
      })
      .catch((err) => {
        if (err) {
          info.alert = "Server error, during add new course";
          return res.status(500).json(info);
        }
      });
  }
});

router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const {
    titleCourse,
    imagePath,
    priceCourse,
    authorCourse,
    onStock,
  } = req.body;

  let info = {
    success: "",
    course: {},
  };
  Course.findById(id)
    .then((course) => {
      if (course) {
        course.title = titleCourse;
        course.imagePath = imagePath;
        course.price = priceCourse;
        course.author = authorCourse;
        course.amount = onStock;

        info.success = "Course updated succesfully";
        course.save().then((response) => {
          info.course = response;
          return res.status(200).json(info);
        });
      }
    })
    .catch((err) => console.log(`Error podczas updated course ${err}`));
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete({ _id: id }, (err, data) => {
    const info3 = {
      alert: "Server error,can't delete during remove course by admin",
    };
    if (err) {
      return res.status(500).json(info3);
    } else {
      const info4 = {
        success: "Course removed succesfully!",
      };

      return res.status(200).json(info4);
    }
  });
});

module.exports = router;

// app.delete("/book/:id", (req, res) => {
//   Book.findOneAndDelete(
//     {
//       _id: req.params.id,
//     },
//     (err, data) => {
//       if (err) {
//         res.send("Błąd podczas usuwania z bazy danych");
//       } else {
//         console.log(data);
//         // res.status(204);
//         res.send(data);
//       }
//     }
//   );
// });

// router.put("/update/:id",(req,res)=>{
//   const id = req.params.id;
//   const time = Date.now();
//   const date = new Date(time);
//   Excercise.findById(id).then(excercise => {
//       excercise.username = req.body.username;
//       excercise.description = req.body.description;
//       excercise.duration = Number(req.body.duration);
//       excercise.date = date;

//       excercise.save().then(()=> res.json("Excercise updated"))
//       .catch((err)=>{
//           console.log("Błąd podczas update w bazie, za pomocą id");
//           res.status(400).json("Error " + err);
//       });
//   });
// });
