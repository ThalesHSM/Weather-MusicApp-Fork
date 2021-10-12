import React from "react";
import axios from "axios";

export async function handleMusic() {
  try {
    const response = await axios.get("https://shazam.p.rapidapi.com/search", {
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "4d1d2cfb2dmsh599a8dd3663b62cp1662b0jsneeb2c92903ed",
      },
      params: {
        term: "rock",
        offset: "0",
        limit: "5",
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
