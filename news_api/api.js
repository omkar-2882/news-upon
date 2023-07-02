// const fs = require('fs');
// const path = require('path');
// const fetch = require('node-fetch')

import fs from "fs"
import path from "path"
import fetch from "node-fetch";

const fetchCategoryNews = async (country, category, page, pageSize) => {
  const apiKey = "d865168ba8a84445b05c22ce257bf397"; // Replace with your actual API key
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      // Save the data to a JSON file
      // Create the directory if it doesn't exist
      const directoryPath = "json"; // Relative path to the directory where you want to save the JSON file
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }

      // Save the data to a JSON file
      const jsonData = JSON.stringify(data);
      const fileName = `${category}.json`;
      const filePath = path.join(directoryPath, fileName);
      fs.writeFileSync(filePath, jsonData);

      return data;
    } else {
      // throw new Error(data.message || 'Failed to fetch news');
      console.log(data.message);
    }
  } catch (error) {
    // throw new Error(error.message || 'Failed to fetch news');
    console.log(error.message);
  }
};

// fetchCategoryNews("in", "general", 1, 5);


