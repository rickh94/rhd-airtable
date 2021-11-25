import {buildAirtableUrl, makeAirtableCall} from "./helpers";

module.exports.main = async (event) => {
  const endpoint = buildAirtableUrl('Completed Projects', 100, 'NOT({Hidden})')
  return makeAirtableCall(endpoint);
}
