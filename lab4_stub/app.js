/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws es.
12. Try to remove a band that does not exist to make sure it throws es.
13. Try to rename a band that does not exist to make sure it throws es.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws es.
15. Try getting a band by ID that does not exist to make sure it throws es.

*/

import * as bands from "./data/bands.js";
import { closeConnection } from "./config/mongoConnection.js";

async function main() {
  let theBeatles;
  let linkinPark;
  let testBand;
  let testBand2;
  try {
    const allBands = await bands.getAll();
    console.log(`Test case: getAll ${JSON.stringify(allBands, null, 1)}`);
  } catch (e) {
    console.log(`Test case: getAll failed:  ${e.message}`);
  }

  try {
    linkinPark = await bands.create(
      "Linkin Park",
      ["Alternative Rock", "Pop Rock", "Alternative Metal"],
      "http://www.linkinpark.com",
      "Warner ",
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

    console.log(
      `Test Case 1: create() returned Object\n${JSON.stringify(
        linkinPark,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case1: create() failed: ${e.message}`);
  }

  try {
    const pinkFloyd = await bands.create(
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
    console.log(
      `Test Case 2: create() returned Object\n${JSON.stringify(
        pinkFloyd,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case2: create() failed: ${e.message}`);
  }

  try {
    theBeatles = await bands.create(
      "The Beatles",
      ["Rock", "Pop", "Psychedelia"],
      "http://www.thebeatles.com",
      "Parlophone",
      ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      1960
    );
    console.log(
      `Test Case 3: create() returned Object\n${JSON.stringify(
        theBeatles,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case3: create() failed: ${e.message}`);
  }

  try {
    const theBeatles = await bands.create(
      "",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkfloyd.com",
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
    console.log(
      `Test Case 4: create() returned Object\n${JSON.stringify(
        theBeatles,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case4: create() failed: ${e.message}`);
  }

  try {
    testBand = await bands.create(
      "alghbewikubgiowebgisdubg",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "https://www.pinkfloyd.co",
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
    console.log(
      `Test Case 5: create() returned Object\n${JSON.stringify(
        theBeatles,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case5: create() failed: ${e.message}`);
  }

  try {
    const theBeatles = await bands.create(
      "dgsdgsdgd",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkFloyd.com",
      "EMI",
      [
        "Roger Waters  ",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      NaN
    );
    console.log(
      `Test Case 6: create() returned Object\n${JSON.stringify(
        theBeatles,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case6: create() failed: ${e.message}`);
  }

  try {
    testBand2 = await bands.create(
      "myBand",
      ["Progressive Rock"],
      "https://www.myband.com",
      "myRecordCompany",
      [" Priyank Thakkur  "],
      2023
    );
    console.log(
      `Test Case 7: create() returned Object\n${JSON.stringify(
        testBand2,
        null,
        1
      )}`
    );
  } catch (e) {
    console.log(`Test Case7: create() failed: ${e.message}`);
  }

  try {
    const band = await bands.get(linkinPark._id);
    console.log(`Test case: get ${JSON.stringify(band, null, 1)}`);
  } catch (e) {
    console.log(`Test case: get failed:  ${e.message}`);
  }

  try {
    const band = await bands.get(1243);
    console.log(`Test case: get ${JSON.stringify(band, null, 1)}`);
  } catch (e) {
    console.log(`Test case: get failed:  ${e.message}`);
  }

  try {
    const renamedBeatles = await bands.rename(theBeatles._id, "Lennon's Boys ");
    console.log(`Test case: rename ${JSON.stringify(renamedBeatles, null, 1)}`);
  } catch (e) {
    console.log(`Test case: rename failed:  ${e.message}`);
  }

  try {
    const renamedBeatles = await bands.rename(theBeatles._id, "Lennon's Boys ");
    console.log(`Test case: rename ${JSON.stringify(renamedBeatles, null, 1)}`);
  } catch (e) {
    console.log(`Test case: rename failed:  ${e.message}`);
  }

  try {
    const delBand = await bands.remove("63fe869bfafaffb680f7f009");
    console.log(`Test case: delBand ${JSON.stringify(delBand, null, 1)}`);
  } catch (e) {
    console.log(`Test case: delBand failed: ${e.message}`);
  }

  try {
    const delBand = await bands.remove(testBand2._id);
    console.log(`Test case: delBand ${JSON.stringify(delBand, null, 1)}`);
  } catch (e) {
    console.log(`Test case: delBand failed: ${e.message}`);
  }

  try {
    const allBands = await bands.getAll();
    console.log(`Test case: getAll ${JSON.stringify(allBands, null, 1)}`);
  } catch (e) {
    console.log(`Test case: getAll failed:  ${e.message}`);
  }

  await closeConnection();
}

main();
