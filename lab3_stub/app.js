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
  // try {
  //   const movieByDirector = await movies.findMoviesByDirector(
  //     "Fernando Dollimore"
  //   );
  //   console.log(movieByDirector);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const movieByActor = await movies.findMoviesByCastMember("Huberto Snoddon");
  //   console.log(movieByActor);
  // } catch (e) {
  //   console.log(e);
  // }
  //   try {
  //     const movieByActor = await movies.getOverallRating(
  //       "Asterix and the Vikings (Astérix et les Vikings)"
  //     );
  //     console.log(movieByActor);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // try {
  //   const movie = await movies.getMovieById(
  //     "38fd6885-0271-4650-8afd-6d09f3a890a2"
  //   );
  //   console.log(movie);
  // } catch (e) {
  //   console.log(e);
  // }

  //   try {
  //     const user = await users.getUserById(
  //       "48fded55-37cd-4e6b-8f19-e78b481a14a4"
  //     );
  //     console.log(user);
  //   } catch (e) {
  //     console.log(e);
  //   }

  // try {
  //   const userlist = await users.sameGenre("Action");
  //   console.log(userlist);
  // } catch (e) {
  //   console.log(e);
  // }
  try {
    const moviesReviewedList = await users.moviesReviewed(
      "64035fad-a5b7-48c9-9317-3e31e22fe26c"
      //"7989fa5e-5617-43f7-a931-46036f9dbcff"
    );
    console.log(moviesReviewedList);
  } catch (e) {
    console.log(e);
  }
}

//call main
main();
