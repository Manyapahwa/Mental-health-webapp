import mongoose from 'mongoose';

const Connection = async () => {
  const URL = process.env.DATABASE_URL;

  try {
    await mongoose.connect(URL);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // stop the server if db doesn't connect
  }
};

export default Connection;
