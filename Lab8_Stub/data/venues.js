import axios from "axios";
import apiKeys from "../config/settings.js";
import * as helpers from "../helpers.js";

const exportVenues = {
  async getVenueSearch(term) {
    term = helpers.isString("Search_term", term);
    const { data } = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues?keyword=${term}&apikey=${apiKeys.key}&countryCode=US`
    );
    return data;
  },

  async getVenueByID(id) {
    id = helpers.isString("ID", id);
    const { data } = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues/${id}?&apikey=${apiKeys.key}&countryCode=US`
    );
    return data;
  },
};

export default exportVenues;
