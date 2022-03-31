import { Schema, model, connect } from "mongoose";

export const Connection = async (): Promise<void> => {
  try {
    const { MONGO_CONNECTION } = process.env;
    await connect(MONGO_CONNECTION!);
    console.log("Mongo Connected");
  } catch (e) {
    throw { message: "Could Not connect to mongo db" };
  }
};
