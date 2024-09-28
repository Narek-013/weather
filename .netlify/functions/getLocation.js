const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
