//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json

import axios from "axios";

async function getMovies() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json"
  );

  return data; // this will be the array of user objects
}

const findMoviesByDirector = async (directorName) => {
  if (typeof directorName !== "string" || directorName.trim().length < 1) {
    throw new Error("Expected directorName to be non Empty String");
  }
  let rawData;
  try {
    rawData = await getMovies();
  } catch (error) {
    throw Error;
  }
  // const rawData = await getMovies();
  let filterData = [];
  directorName = directorName.toLowerCase().trim();

  //push every movie By director into final array
  rawData.forEach((movieElm) => {
    if (movieElm["director"].toLowerCase().trim() === directorName)
      filterData.push(movieElm);
  });

  if (filterData.length < 1) throw new Error("No Movies found");

  return filterData;
};

const findMoviesByCastMember = async (castMemberName) => {
  //error check
  if (typeof castMemberName !== "string" || castMemberName.trim().length < 1) {
    throw new Error("Expected castMemberName to be non Empty String");
  }

  castMemberName = castMemberName.trim().toLowerCase();
  const rawData = await getMovies();
  let filterData = [];

  //push every movie whose castmember name matches given cast name

  rawData.forEach((movie) => {
    if (movie.hasOwnProperty("cast")) {
      let castMembers = movie["cast"];

      for (let cast of castMembers) {
        if (cast.trim().toLowerCase() === castMemberName)
          filterData.push(movie);
      }
    }
  });

  //throw error if no movies are found
  if (filterData.length < 1) throw new Error("No Movies found");

  return filterData;
};

const getOverallRating = async (title) => {
  if (typeof title !== "string" || title.trim().length < 1) {
    throw new Error("Expected title to be non Empty String");
  }

  const rawData = await getMovies();
  title = title.trim().toLowerCase();

  let filterData = rawData.filter(
    (rawData) => rawData["title"].trim().toLowerCase() === title
  );

  if (typeof filterData === "undefined" || filterData.length < 0)
    throw new Error("Movie not found");

  let reviews = filterData[0]["reviews"];
  let avgRating = 0;
  let ratingUserCount = 0;
  reviews.forEach((element) => {
    if (element.hasOwnProperty("rating")) {
      avgRating += element["rating"];
      ratingUserCount++;
    }
  });

  //edge case if there are no ratings given to movie
  if (ratingUserCount === 0) return 0;

  avgRating = avgRating / ratingUserCount;

  //rounding off to lowest first decimal place
  avgRating = Math.trunc(avgRating) + Math.floor((avgRating % 1) * 10) / 10;

  return Number(avgRating);
};

const getMovieById = async (id) => {
  if (typeof id !== "string" || id.trim().length < 1)
    throw new Error("Expected castMemberName to be non Empty String");
  const rawData = await getMovies();
  id = id.trim().toLowerCase();

  let finalMovie;

  //loop through entire movie data and return first matching movie
  rawData.forEach((movieObj) => {
    if (movieObj.hasOwnProperty("id")) {
      if (movieObj["id"].trim().toLowerCase() === id) {
        finalMovie = movieObj;
        return;
      }
    }
  });

  //throw error if no movie is found
  if (typeof finalMovie === "undefined") throw new Error("Movie Not found");
  return finalMovie;
};

export {
  getMovies,
  findMoviesByDirector,
  findMoviesByCastMember,
  getOverallRating,
  getMovieById,
};
