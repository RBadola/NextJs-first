import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number
}

const connection: ConnectionObject ={}

async function dbConnect(): Promise<void>  {
    if(connection.isConnected){
        console.log("Already Connected");
        return
    }
    try {
       const db = await mongoose.connect(process.env.MONGODBURI || '')
       console.log(db);
       connection.isConnected =  db.connections[0].readyState
       console.log("Db Connected");
    } catch (error) {
        console.log("Db connection failed");
        console.log(error);
process.exit(1)
    }
}

export default dbConnect;