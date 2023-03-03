//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'

export the router */

import { Router } from "express";
import mystory from "../data/mystory.js";
import aboutme from "../data/aboutme.js";
import educationhistory from "../data/educationhistory.js";

const router = Router();

router.route("/aboutme").get(async (req, res) => {
  try {
    return res.send(aboutme["aboutme"]);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route("/mystory").get(async (req, res) => {
  try {
    return res.json(mystory.myStory);
  } catch (e) {
    res.status(404).json(e);
  }
});
router.route("/educationhistory").get(async (req, res) => {
  try {
    return res.json(educationhistory["myEducationHistory"]);
  } catch (e) {
    res.status(404).json(e);
  }
});

export default router;
