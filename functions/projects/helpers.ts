import axios from "axios";

export function buildAirtableUrl(table: string, maxRecords: number = 100, filter: string = ''): string {
  const tableURL = new URL('https://api.airtable.com');
  tableURL.pathname = `/v0/${process.env.AIRTABLE_BASE_ID}/${table}`;
  tableURL.search = (new URLSearchParams({
    maxRecords: maxRecords.toString(),
    filterByFormula: filter,
    view: 'Grid view'
  })).toString();
  return tableURL.toString();
}

export async function makeAirtableCall(endpoint: string): Promise<{ statusCode: number, body: string, headers?: object }> {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(response.data.records),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server Error: Could not access records"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}
