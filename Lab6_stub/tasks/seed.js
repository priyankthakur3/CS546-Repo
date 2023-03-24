import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { bands } from "../config/mongoCollections.js";
import { bandData } from "../data/index.js";
import { albumData } from "../data/index.js";
async function main() {
  let db = await dbConnection();
  await db.dropCollection("bands");
  let linkinPark = await bandData.create(
    "Linkin Park",
    ["Alternative Rock", "Pop Rock", "Alternative Metal"],
    "http://www.linkinpark.com",
    "Warner",
    [
      "Chester Bennington",
      "Rob Bourdon",
      "Brad Delson",
      "Mike Shinoda",
      "Dave Farrell",
      "Joe Hahn",
    ],
    1996
  );

  let pinkFloyd = await bandData.create(
    "Pink Floyd ",
    ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
    "https://www.pinkfloyd.com ",
    "EMI",
    [
      "Roger Waters  ",
      "David Gilmour",
      "Nick Mason",
      "Richard Wright",
      "Sid Barrett",
    ],
    1965
  );

  let Beatles = await bandData.create(
    "The Beatles",
    ["Rock", "Pop", "Psychedelia"],
    "http://www.thebeatles.com",
    "Parlophone",
    ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
    1960
  );

  let imagineDragons = await bandData.create(
    "Imagine Dragons",
    [
      "Pop rock",
      "electropop",
      "pop",
      "indie pop",
      "arena rock",
      "alternative rock",
    ],
    "https://www.imaginedragonsmusic.com",
    "Interscope",
    ["Dan Reynolds", "Wayne Sermon", "Ben McKee", "Daniel Platzman"],
    2008
  );

  let hybridTheory = await albumData.create(
    linkinPark._id,
    "Hybrid Theory",
    "02/28/2001",
    [
      "Papercut",
      "One Step Closer",
      "With You",
      "Points of Authority",
      "Crawling",
      "Runaway",
      "By Myself",
      "In the End",
      "A Place for My Head",
      "Forgotten",
      "Cure for the Itch",
      "Pushing Me Away",
    ],
    4.5
  );
  let meteora = await albumData.create(
    linkinPark._id,
    "Meteora",
    "03/25/2003",
    [
      "Foreword",
      "Don't Stay",
      "Somewhere I Belong",
      "Lying from You",
      "Hit the Floor",
      "Easier to Run",
      "Faint",
      "Figure.09",
      "Breaking the Habit",
      "From the Inside",
      "Nobody's Listening",
      "Session",
      "Numb",
    ],
    4.6
  );
  let minutestomidnight = await albumData.create(
    linkinPark._id,
    "Minutes to Midnight",
    "05/14/2007",
    [
      "Wake",
      "Given Up",
      "Leave Out All the Rest",
      "Bleed It Out",
      "Shadow of the Day",
      "What I've Done",
      "Hands Held High",
      "No More Sorrow",
      "Valentine's Day",
      "In Between",
      "In Pieces",
      "The Little Things Give You Away",
    ],
    4
  );
  await closeConnection();
}

await main();
