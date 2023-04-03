//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import { Router } from "express";
import { isString } from "../helpers.js";
import { venueDataFunction } from "../data/index.js";

const router = Router();
router.route("/").get(async (req, res) => {
  //code here for GET
  try {
    res.render("pages/homepage", { title: "Venue Finder" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/searchvenues").post(async (req, res) => {
  let searchVenueTerm = req.body.venueSearchTerm;
  try {
    searchVenueTerm = isString("Venue Search Term", searchVenueTerm);
  } catch (error) {
    return res.status(400).render("pages/homepage", {
      title: "Venue Finder",
      error_msg: error.message,
    });
  }
  let data;
  try {
    data = await venueDataFunction.getVenueSearch(searchVenueTerm);
    if (data.page.totalElements === 0) throw `No Shows found`;
  } catch (error) {
    return res.status(400).render("pages/venueNotFound", {
      title: "Venue Finder",
      searchVenueTerm,
    });
  }
  try {
    const firstTenVenues = await venueDataFunction.getVenuesTopN(
      data._embedded.venues,
      10
    );

    res.render("pages/venueSearchResults", {
      title: "Venues Found",
      searchVenueTerm,
      venues: firstTenVenues,
    });

    searchVenueTerm;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.route("/venuedetails/:id").get(async (req, res) => {
  //code here for GET
  let data;
  let id = req.params.id;
  try {
    id = isString("ID", id);
    data = await venueDataFunction.getVenueByID(id);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  let venue_name,
    venue_link,
    venue_image_path,
    venue_address,
    venue_phoneNumberDetail;
  try {
    venue_name = data.name;
    if (data.images && data.images[0]) {
      if (data.images[0].url) venue_image_path = data.images[0].url;
    } else venue_image_path = `\\public\\images\\No_Image_Available.jpg`;

    if (data.boxOfficeInfo) {
      if (data.boxOfficeInfo.phoneNumberDetail)
        venue_phoneNumberDetail = data.boxOfficeInfo.phoneNumberDetail;
    } else venue_phoneNumberDetail = "N/A";

    if (data.url) venue_link = data.url;
    else venue_link = "#";

    if (
      data.address.line1 &&
      data.country &&
      data.city.name &&
      data.state.stateCode &&
      data.postalCode
    ) {
      if (data.address.line2)
        venue_address = data.address.line1.concat(", ", data.address.line2);
      else
        venue_address = data.address.line1.concat(
          ", ",
          data.city.name,
          ", ",
          data.state.stateCode,
          " ",
          data.postalCode
        );
    } else venue_address = "N/A";

    res.render("pages/venueByID", {
      title: venue_name,
      venue_name,
      venue_image_path,
      venue_address,
      venue_link,
      venue_address,
      venue_phoneNumberDetail,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
