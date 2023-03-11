// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from "express";
import { bandData } from "../data/index.js";
import * as helpers from "../helpers.js";
const router = Router();
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      let bandsList = await bandData.getAll();
      let finalRes = [];
      bandsList.forEach((element) => {
        finalRes.push({ _id: element._id, name: element.name });
      });
      res.json(finalRes);
    } catch (error) {
      return res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    let bandInfo = req.body;
    let newBand;

    if (!bandInfo || Object.keys(bandInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in request body" });
    }
    try {
      bandInfo.name = helpers.isString("Band Name", bandInfo.name);
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.recordCompany = helpers.isString(
        "Record Company",
        bandInfo.recordCompany
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.genre = helpers.checkNonEmptyStrArr(
        "Band Info Genre",
        bandInfo.genre
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.groupMembers = helpers.checkNonEmptyStrArr(
        "Band GroupMembers",
        bandInfo.groupMembers
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.website = helpers.isURL("Band Website", bandInfo.website);
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.yearBandWasFormed = helpers.checkReleaseYear(
        bandInfo.yearBandWasFormed
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      newBand = await bandData.create(
        bandInfo.name,
        bandInfo.genre,
        bandInfo.website,
        bandInfo.recordCompany,
        bandInfo.groupMembers,
        bandInfo.yearBandWasFormed
      );
      res.json(newBand);
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    // return res.json(newBand);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = helpers.isID(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      let band = await bandData.get(req.params.id);
      res.json(band);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE

    try {
      req.params.id = helpers.isID(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    let deletedBand;
    try {
      deletedBand = await bandData.remove(req.params.id);
      if (deletedBand) res.json({ bandid: req.params.id, deleted: true });
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  })
  .put(async (req, res) => {
    //code here for PUT

    let bandInfo = req.body;
    let newBand;

    try {
      req.params.id = helpers.isID(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (!bandInfo || Object.keys(bandInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in request body" });
    }
    try {
      bandInfo.name = helpers.isString("Band Name", bandInfo.name);
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.recordCompany = helpers.isString(
        "Record Company",
        bandInfo.recordCompany
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.genre = helpers.checkNonEmptyStrArr(
        "Band Info Genre",
        bandInfo.genre
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.groupMembers = helpers.checkNonEmptyStrArr(
        "Band GroupMembers",
        bandInfo.groupMembers
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.website = helpers.isURL("Band Website", bandInfo.website);
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      bandInfo.yearBandWasFormed = helpers.checkReleaseYear(
        bandInfo.yearBandWasFormed
      );
    } catch (e) {
      //console.log(`Error: ${e}`);
      return res.status(400).json({ error: e.message });
    }

    try {
      newBand = await bandData.update(
        req.params.id,
        bandInfo.name,
        bandInfo.genre,
        bandInfo.website,
        bandInfo.recordCompany,
        bandInfo.groupMembers,
        bandInfo.yearBandWasFormed
      );
      res.json(newBand);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  });
export default router;
