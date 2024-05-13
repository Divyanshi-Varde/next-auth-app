const mongoose = require("mongoose");

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected!");
    });

    connection.on("error", (err: any) => {
      console.log("MongoDB connection error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong, Error while connecting to the database");
    console.log(error);
  }
}
