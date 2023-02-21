/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

import * as movies from "./movies.js";
import * as users from "./users.js";

async function main() {
  try {
    const directorName = "Fernando DOllimore";
    const movieByDirector = await movies.findMoviesByDirector(directorName);
    console.log(
      `Test Case 1: findMoviesByDirector Movies by Director: "${directorName}" \n${JSON.stringify(
        movieByDirector,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: findMoviesByDirector failed Error: ${e.message}`);
  }

  try {
    const directorName = "Fernando DOllimore";
    const movieByDirector = await movies.findMoviesByDirector(123);
    console.log(
      `Test Case 2: Movies by Director: "${directorName}" \n${JSON.stringify(
        movieByDirector,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: findMoviesByDirector failed Error: ${e.message}`);
  }

  try {
    const actorName = "Huberto Snoddon";
    const movieByActor = await movies.findMoviesByCastMember(actorName);
    console.log(
      `Test Case1: findMoviesByCastMember Movies by "${actorName}" : \n${JSON.stringify(
        movieByActor,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(
      `Test Case1: findMoviesByCastMember failed Error: ${e.message}`
    );
  }

  try {
    const actorName = "John Snow";
    const movieByActor = await movies.findMoviesByCastMember(actorName);
    console.log(
      `Test Case2: findMoviesByCastMember Movies by "${actorName}" : ${JSON.stringify(
        movieByActor,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(
      `Test Case2: findMoviesByCastMember failed Error: ${e.message}`
    );
  }

  try {
    const movie = "ASterix and the Vikings (Astérix et les Vikings)";
    const movieRating = await movies.getOverallRating(movie);
    console.log(
      `Test Case1: getOverallRating Rating for "${movie}" : ${JSON.stringify(
        movieRating,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: getOverallRating failed Error: ${e.message}`);
  }

  try {
    const movie = 123;
    const movieRating = await movies.getOverallRating(movie);
    console.log(
      `Test Case2: getOverallRating Rating for "${movie}" : ${JSON.stringify(
        movieRating,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: getOverallRating failed Error: ${e.message}`);
  }

  try {
    const movieID = "38fd6885-0271-4650-8afd-6d09f3a890a2";
    const movie = await movies.getMovieById(movieID);
    console.log(
      `Test Case1: getMovieById Movie detail for ID "${movieID}": \n${JSON.stringify(
        movie,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: getMovieById failed Error: ${e.message}`);
  }

  try {
    const movieID = "38f46885-0271-4650-8afd-6d09f3a890a2";
    const movie = await movies.getMovieById(movieID);
    console.log(
      `Test Case2: getMovieById Movie detail for ID "${movieID}": \n${JSON.stringify(
        movie,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: getMovieById failed Error: ${e.message}`);
  }

  try {
    const userID = "64035fad-a5b7-48c9-9317-3e31e22fe26c";
    const user = await users.getUserById(userID);
    console.log(
      `Test Case1: getUserById Movie detail for ID "${userID}" : \n${JSON.stringify(
        user,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: getUserById failed Error: ${e.message}`);
  }

  try {
    const userID = "7989fa5e-5617-43f7-a931-46036f9dbcff";
    const user = await users.getUserById(userID);
    console.log(
      `Test Case2: getUserById Movie detail for ID ${userID}: \n${JSON.stringify(
        user,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: getUserById failed Error: ${e.message}`);
  }

  try {
    const genre = "Action";
    const userList = await users.sameGenre(genre);
    console.log(
      `Test Case1: sameGenre User List for "${genre}": \n${JSON.stringify(
        userList,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: sameGenre failed Error: ${e.message}`);
  }

  try {
    const genre = "(no genres listed)";
    const userList = await users.sameGenre(genre);
    console.log(
      `Test Case2: sameGenre User List for "${genre}": \n${JSON.stringify(
        userList,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: sameGenre failed Error: ${e.message}`);
  }
  try {
    const userID = "64035fad-a5b7-48c9-9317-3e31e22fe26c";
    const moviesReviewedList = await users.moviesReviewed(userID);
    console.log(
      `Test Case1: moviesReviewedList  List for "${userID}": \n${JSON.stringify(
        moviesReviewedList,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: moviesReviewedList failed Error: ${e.message}`);
  }

  try {
    const userID = NaN;
    const moviesReviewedList = await users.moviesReviewed(userID);
    console.log(
      `Test Case2: moviesReviewedList  List for "${userID}": \n${JSON.stringify(
        moviesReviewedList,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: moviesReviewedList failed Error: ${e.message}`);
  }

  try {
    const userID = "03cff5e0-61e4-449f-8591-ddbb58aa2ca7";
    const recomendedMovies = await users.referMovies(userID);
    console.log(
      `Test Case1: recomendedMovies  List for "${userID}": \n${JSON.stringify(
        recomendedMovies,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: recomendedMovies failed Error: ${e.message}`);
  }

  try {
    const userID = "5060fc9e-10c7-4f38-9f3d-47b7f477568b";
    const recomendedMovies = await users.referMovies(userID);
    console.log(
      `Test Case1: recomendedMovies  List for "${userID}": \n${JSON.stringify(
        recomendedMovies,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: recomendedMovies failed Error: ${e.message}`);
  }
}

//call main
main();
