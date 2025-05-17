import mongoose from "mongoose"

const connect = () => {
  const run = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((mongoose) => {
    console.log("Connected to MongoDB")
    return mongoose
  }).catch((err) => {
    console.log("Error connecting to MongoDB", err)
  })

  return run

}

export default connect