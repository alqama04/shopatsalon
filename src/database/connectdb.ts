import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.DATABASE_URI!, {
      tls: true,
    });
    console.log('connected --------------------------')
  } catch (error) {
    console.log(error,'--------------------');
  }
}

export default connectDb
