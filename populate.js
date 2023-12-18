import dotenv from "dotenv";
dotenv.config();
// import-data.js

import { readFile } from "fs/promises";
import connectDB from "./db/connect.js";
import Job from "./models/Job.js";

const importData = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    const jsonProducts = JSON.parse(
      await readFile(new URL("./data.json", import.meta.url))
    );

    await Job.create(jsonProducts);
    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error.message);
  } finally {
    process.exit();
  }
};

export default importData;
