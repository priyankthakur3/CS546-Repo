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

  id = id.trim().toLowerCase();

  const allUsers = await getUsers();
  let finalUser;

  allUsers.forEach((user) => {
    if (user.hasOwnProperty("id")) {
      if (user["id"].trim().toLowerCase() === id) {
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
      if (user["favorite_genre"].trim().toLowerCase() === genre) {
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

    //Sort by Last Name
    if (a_lastName > b_lastName) return 1;
    else if (a_lastName < b_lastName) return -1;
    //if Last Name is same then sort by First Name
    else {
      if (a_firstName > b_firstName) return 1;
      else if (a_firstName < b_firstName) return -1;
      else return 0;
    }
  });

  //build final output list
  for (let user of finalUsers) {
    resultUsers.push(`${user[0]} ${user[1]}`);
  }

  return resultUsers;
};

const moviesReviewed = async (id) => {
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected id to be string");

  id = id.trim().toLowerCase();

  let allMovies = await getMovies();
  let user;

  try {
    user = await getUserById(id);
  } catch (e) {
    throw e;
  }

  //error check if user exists
  if (typeof user !== "object" || !user.hasOwnProperty("id"))
    throw new Error("ER User Not Found");

  let moviesReviewedList = [];

  //loop through all movies
  for (let movie of allMovies) {
    //check if reviews property exists
    if (movie.hasOwnProperty("reviews")) {
      for (let review of movie["reviews"]) {
        //check if review obj has username, rating and review property
        if (
          review.hasOwnProperty("username") &&
          review.hasOwnProperty("rating") &&
          review.hasOwnProperty("review")
        ) {
          let reviewUsername = review["username"].trim().toLowerCase();
          let ratingReview = review["rating"];
          let reviewText = review["review"].trim().toLowerCase();
          if (reviewUsername === user["username"].trim().toLowerCase()) {
            //build final output Obj for list
            let tempObj = {
              username: reviewUsername,
              rating: Number(ratingReview),
              review: reviewText,
            };
            tempObj[movie["title"]] = review;
            moviesReviewedList.push(tempObj);
          }
        }
      }
    }
  }

  return moviesReviewedList;
};

const referMovies = async (id) => {
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected id to be string");

  let allMovies = await getMovies();
  let reviewedMoviesUser;
  let user;
  let recomendedMoviesList = [];

  //get all user properties for id
  try {
    user = await getUserById(id);
  } catch (e) {
    throw e;
  }

  //get list of all movies reviewed by user
  try {
    reviewedMoviesUser = await moviesReviewed(id);
  } catch (e) {
    throw e;
  }

  //error check if user exists
  if (typeof user !== "object" || !user.hasOwnProperty("id"))
    throw new Error("ER User Not Found");

  //check if "favorite_genre" property exists
  if (!user.hasOwnProperty("favorite_genre"))
    throw new Error("Genre not found in User details");

  for (let movie of allMovies) {
    //check if movie has genre
    if (!movie.hasOwnProperty("genre")) continue;

    let movieGenre = movie["genre"].split("|");

    //check if user favorite genre matches movies genre and if has already given review for movie
    //if not then add movie in recomendation list
    if (
      movieGenre.includes(user["favorite_genre"]) &&
      !Object.keys(reviewedMoviesUser).includes(movie["title"])
    )
      recomendedMoviesList.push(movie["title"]);
  }
  return recomendedMoviesList;
};

export { getUserById, sameGenre, moviesReviewed, referMovies };
