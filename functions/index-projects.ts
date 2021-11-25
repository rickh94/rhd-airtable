import {buildAirtableUrl, makeAirtableCall} from "./helpers";

module.exports.main = async (event) => {
  const endpoint = buildAirtableUrl('Completed Projects', 3, '{Featured}')
  return makeAirtableCall(endpoint);
}
