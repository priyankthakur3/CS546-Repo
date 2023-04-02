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

  async getVenuesTopN(data, elementsCount) {
    if (!data) throw new Error(`No Venue data input provided`);
    if (!elementsCount) throw new Error(`No Top N provided`);
    return data.slice(0, elementsCount);
  },

  async checkIfExists(obj, key, returnValue) {
    if (!obj || !key || !returnValue)
      throw new Error(`Invalid Parameters Passed`);

    if (obj.hasOwnProperty(key)) return obj.key;
    else returnValue;
  },
};

export default exportVenues;
