// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
import { albumData, bandData } from "../data/index.js";
import * as helpers from "../helpers.js";
const router = Router();

router
  .route("/:bandId")
  .get(async (req, res) => {
    //code here for GET

    try {
      req.params.bandId = helpers.isID(req.params.bandId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    let albumList;
    try {
      albumList = await albumData.getAll(req.params.bandId);
      res.json(albumList);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST

    try {
      req.params.bandId = helpers.isID(req.params.bandId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    let albumInfo = req.body;

    if (!albumInfo || Object.keys(albumInfo) === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in request body" });
    }
    try {
      albumInfo.title = helpers.isString("Album Title", albumInfo.title);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    try {
      albumInfo.releaseDate = helpers.checkDate(
        "Album Release Date",
        albumInfo.releaseDate
      );
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    try {
      albumInfo.tracks = helpers.checkNonEmptyStrArr(
        "Album Tracks",
        albumInfo.tracks,
        3
      );
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    if (
      albumInfo.rating < 1 ||
      albumInfo.rating > 5 ||
      helpers.getDecimalPlaces("Album Rating", albumInfo.rating) > 1
    )
      return res.status(400).json({
        error:
          "Improper Album Rating Expected Rating between 1 to 5 upto Single Decimal place",
      });

    //check if bandID exists in Database or not

    try {
      await bandData.get(req.params.bandId);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }

    let newAlbumObj;

    try {
      newAlbumObj = await albumData.create(
        req.params.bandId,
        albumInfo.title,
        albumInfo.releaseDate,
        albumInfo.tracks,
        albumInfo.rating
      );
      res.json(newAlbumObj);
    } catch (e) {
      return res.status(500).json({
        error: e.message,
      });
    }
  });

router
  .route("/album/:albumId")
  .get(async (req, res) => {
    try {
      req.params.albumId = helpers.isID(req.params.albumId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    let albumObj;
    try {
      albumObj = await albumData.get(req.params.albumId);
      res.json(albumObj);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.albumId = helpers.isID(req.params.albumId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      let updatedBand = await albumData.remove(req.params.albumId);
      let albumExists = updatedBand["albums"].find((album) => {
        album._id === req.params.albumId;
      });
      if (!albumExists)
        return res.json({ albumId: req.params.albumId, deleted: true });
      else return res.status(500).json({ error: "Failed to Update" });
    } catch (e) {
      if (e.message === "Album Not Found")
        return res.status(404).json({ error: e.message });
      else return res.status(500).json({ error: e.message });
    }
  });

export default router;
