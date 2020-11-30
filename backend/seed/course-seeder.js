const Course = require("../models/course.model");

const mongoose = require("mongoose");

require('dotenv').config();

const url = process.env.ATLAS_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const courses = [
    new Course({
        title: "Web developer od podstaw w 15 dni",
        imagePath: 'images/Webdev15.jpg',
        price: parseFloat('69.99'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "Front-end zaawansowany w 15 dni",
        imagePath: 'images/Frontadv15.jpg',
        price: parseFloat('69.99'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "Programowanie w JavaScript",
        imagePath: 'images/ProgJs.jpg',
        price: parseFloat('69.99'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "React od podstaw",
        imagePath: 'images/ReactBeg.jpg',
        price: parseFloat('69.99'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "Wprowadzenie do Git i GitHub",
        imagePath: 'images/GitGithub.jpg',
        price: parseFloat('0.00'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "Node.js, Express i MongoDB",
        imagePath: 'images/NodeExDB.jpg',
        price: parseFloat('69.99'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "Zaawansowane projekty w CSS i JavaScript",
        imagePath: 'images/CssJs.jpg',
        price: parseFloat('69.99'),
        author: ["Samuraj Programowania"]
    }),
    new Course({
        title: "Programowanie obiektowe w JavaScript - opanuj, tworząc gry!",
        imagePath: 'images/ObjectProg.jpg',
        price: parseFloat('84.99'),
        author: ["Samuraj Programowania i inni"]
    }),
];

for(let i = 0; i < courses.length; i++){
    console.log(i)
    courses[i].save((err,data)=>{
        if(err) console.log(err)
        if(i+1 === courses.length){
            exit();
        }
    });
};

function exit(){
    mongoose.disconnect();
}