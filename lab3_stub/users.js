//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
import axios, { all } from "axios";
import { getMovies } from "./movies.js";
async function getUsers() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json"
  );
  return data; // this will be the array of user objects
}

const getUserById = async (id) => {
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected ID to be string");

  id = id.trim();

  const allUsers = await getUsers();
  let finalUser;

  allUsers.forEach((user) => {
    if (user.hasOwnProperty("id")) {
      if (user["id"] === id) {
        finalUser = user;
        return;
      }
    }
  });

  if (typeof finalUser === "undefined") throw new Error("User Not found");
  return finalUser;
};

const sameGenre = async (genre) => {
  if (typeof genre !== "string" || genre.trim().length < 1)
    throw new Error("Expected genre to be string");

  genre = genre.trim().toLowerCase();

  let allUsers = await getUsers();
  let finalUsers = [];
  let resultUsers = [];
  allUsers.forEach((user) => {
    if (user.hasOwnProperty("favorite_genre")) {
      if (user["favorite_genre"].toLowerCase() === genre) {
        let userName = [user["first_name"].trim(), user["last_name"].trim()];
        finalUsers.push(userName);
        if (finalUsers.length === 50) return;
      }
    }
  });

  if (finalUsers.length <= 2)
    throw new Error("There are not two people with that genre");

  finalUsers = finalUsers.sort((a, b) => {
    let a_lastName = a[1];
    let a_firstName = a[0];
    let b_lastName = b[1];
    let b_firstName = b[0];

    if (a_lastName > b_lastName) return 1;
    else if (a_lastName < b_lastName) return -1;
    else {
      if (a_firstName > b_firstName) return 1;
      else if (a_firstName < b_firstName) return -1;
    }
  });

  for (let user of finalUsers) {
    resultUsers.push(`${user[0]} ${user[1]}`);
  }

  return resultUsers;
};

const moviesReviewed = async (id) => {
  /**
   * !todo: add more check for review
   *
   */
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected id to be string");

  let allMovies = await getMovies();

  try {
    let user = await getUserById(id);
  } catch (e) {
    throw e;
  }

  //error check if user exists
  if (typeof user !== "object" || !user.hasOwnProperty("id"))
    throw new Error("User Not Found");

  let moviesReviewedList = [];

  for (let movie of allMovies) {
    if (movie.hasOwnProperty("reviews")) {
      for (let review of movie["reviews"]) {
        if (review.hasOwnProperty("username")) {
          if (
            review["username"].trim().toLowerCase() ===
            user["username"].trim().toLowerCase()
          ) {
            let tempObj = {};
            tempObj[movie["title"]] = review;
            moviesReviewedList.push(tempObj);
          }
        }
      }
    }
  }

  return moviesReviewedList;
};

const referMovies = async (id) => {};

export { getUserById, sameGenre, moviesReviewed, referMovies };
