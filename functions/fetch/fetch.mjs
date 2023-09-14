const axios = require('axios');

export const handler = async (event, context) => {
  try {
    const resp = await axios.get(process.env.FETCH_URL);
    return {
      statusCode: 200,
      body: JSON.stringify({ body: resp.data })
    };
  } catch (error) {
    const {status,statusText,headers,data} = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({status,statusText,headers,data})
    }
  }
}

