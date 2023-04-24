//import express, express router as shown in lecture code

import { Router } from "express";
import validations from "../helpers.js";
import userDataFunction from "../data/users.js";
import xss from "xss";

const router = Router();

router.route("/").get(
  (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    } else if (req.session.user.role === "admin") return res.redirect("/admin");
    else if (req.session.user.role === "user")
      return res.redirect("/protected");
    next();
  },
  async (req, res) => {
    //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
    return res.json({ error: "YOU SHOULD NOT BE HERE!" });
  }
);

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    res.render("register", { title: "Register" });
  })
  .post(async (req, res) => {
    //code here for POST

    let user_first_name = xss(req.body.firstNameInput);
    let user_last_name = xss(req.body.lastNameInput);
    let user_emailaddress = xss(req.body.emailAddressInput);
    let user_password = xss(req.body.passwordInput);
    let user_password_confirm = xss(req.body.confirmPasswordInput);
    let user_role = xss(req.body.roleInput);

    try {
      user_first_name = validations.isStringName("First Name", user_first_name);
      user_last_name = validations.isStringName("Last Name", user_last_name);
      user_emailaddress = validations.checkMail(user_emailaddress);
      user_password = validations.checkPassword(user_password);
      user_password_confirm = validations.checkPassword(user_password_confirm);
      user_role = validations.isString("Role", user_role);
      if (user_role !== "admin" && user_role !== "user")
        throw new Error(`Expected role to be user or admin`);
      if (user_password !== user_password_confirm)
        throw new Error(`Paswords donot match please check password`);
    } catch (error) {
      return res.status(400).render("register", {
        title: "Error",
        render_error: true,
        error_msg: error,
      });
    }
    let userCreated;
    try {
      userCreated = await userDataFunction.createUser(
        user_first_name,
        user_last_name,
        user_emailaddress,
        user_password,
        user_role
      );
    } catch (error) {
      if (error.message === "User already Exists in Database!")
        return res.status(400).render("register", {
          title: "Signup",
          render_error: true,
          error_msg: error.message,
        });
      else
        return res.status(500).render("register", {
          title: "Signup",
          render_error: true,
          error_msg: error.message,
        });
    }
    if (userCreated && userCreated.insertedUser)
      return res.render("register", { title: "Signup", newUserCreated: true });
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    res.render("login", { title: "Login" });
  })
  .post(async (req, res) => {
    //code here for POST
    let user_email = xss(req.body.emailAddressInput);
    let user_password = xss(req.body.passwordInput);

    try {
      user_email = validations.checkMail(user_email);
      user_password = validations.checkPassword(user_password);
    } catch (error) {
      return res.status(400).render("login", {
        title: "Login",
        render_error: true,
        error_msg: error.message,
      });
    }
    let userExists;
    try {
      userExists = await userDataFunction.checkUser(user_email, user_password);
    } catch (error) {
      return res.status(400).render("login", {
        title: "Login",
        render_error: true,
        error_msg: error.message,
      });
    }
    if (userExists) {
      req.session.user = userExists;
      if (xss(req.session.user.role === "user")) res.redirect("/protected");
      if (xss(req.session.user.role === "admin")) res.redirect("/admin");
    }
  });

router.route("/protected").get(async (req, res) => {
  //code here for GET

  return res.render("protected", {
    title: "Protected Route",
    firstName: req.session.user.firstName,
    currentTime: new Date().toUTCString(),
    role: req.session.user.role,
  });
});

router.route("/admin").get(async (req, res) => {
  //code here for GET
  return res.render("admin", {
    title: "Admin Route",
    firstName: req.session.user.firstName,
    currentTime: new Date().toUTCString(),
  });
});

router.route("/error").get(async (req, res) => {
  //code here for GET

  return res.status(req.session.error.error_code).render("error", {
    title: "error",
    error_msg: req.session.error.msg,
  });
});

router.route("/logout").get(async (req, res) => {
  //code here for GET

  req.session.destroy();
  res.render("logout", { title: "Logout" });
});

export default router;
