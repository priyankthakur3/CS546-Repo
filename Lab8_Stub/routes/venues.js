//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import { Router } from "express";
import { isString } from "../helpers.js";
import { venueDataFunction } from "../data/index.js";

const router = Router();
router.route("/").get(async (req, res) => {
  //code here for GET
  try {
    return res.render("homepage", { title: "Venue Finder" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/searchvenues").post(async (req, res) => {
  let searchVenueTerm = req.body.venueSearchTerm;
  try {
    searchVenueTerm = isString("Venue Search Term", searchVenueTerm);
  } catch (error) {
    return res.status(400).render("homepage", {
      title: "Venue Finder",
      error_msg: error.message,
    });
  }
  let data;
  try {
    data = await venueDataFunction.getVenueSearch(searchVenueTerm);
    if (data.page.totalElements === 0) throw `No Shows found`;
  } catch (error) {
    if (error.response)
      if (error.response.status === 401)
        return res
          .status(500)
          .render("error", { error_msg: `Internal Server Error!!` });

    return res.status(400).render("venueNotFound", {
      title: "Venue Finder",
      searchVenueTerm,
    });
  }
  try {
    const firstTenVenues = data._embedded.venues.slice(0, 10);

    res.render("venueSearchResults", {
      title: "Venues Found",
      searchVenueTerm,
      venues: firstTenVenues,
    });
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
    if (error.errors || error.error.length > 0)
      return res
        .status(Number(error.errors[0].status))
        .render("error", { error_msg: `404: ${error.errors[0].detail}` });

    if (error.fault || error.fault.faultstring === "Invalid ApiKey")
      return res
        .status(500)
        .render("error", { error_msg: `Internal Server Error!!` });
  }
  let venue_name,
    venue_link,
    venue_link_text,
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

    if (data.url) {
      venue_link = data.url;
      venue_link_text = "Venue Information on Ticketmaster";
    } else {
      venue_link = false;
      venue_link_text = "N/A";
    }
    let line1, country, city, stateCode, postalCode;
    if (data.address.line1) line1 = data.address.line1;
    else line1 = "N/A";
    if (data.country) country = data.country;
    else country = "N/A";
    if (data.city.name) city = data.city.name;
    else city = "N/A";
    if (data.state.stateCode) stateCode = data.state.stateCode;
    else stateCode = "N/A";
    if (data.postalCode) postalCode = data.postalCode;
    else postalCode = "N/A";

    if (data.address.line2)
      venue_address = line1.concat(", ", data.address.line2);
    else venue_address = line1;

    venue_address = venue_address.concat(
      ", ",
      city,
      ", ",
      stateCode,
      " ",
      postalCode
    );

    res.render("venueByID", {
      title: venue_name,
      venue_name,
      venue_image_path,
      venue_address,
      venue_link,
      venue_link_text,
      venue_address,
      venue_phoneNumberDetail,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
