import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
const main = async () => {
  
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // Create a colection = table, document = record
  // const newLog = await LogModel.create({
  //   message: 'Test message from mongo',
  //   origin: 'app.ts',
  //   level: 'low',
  // });

  // await newLog.save();
  // console.log(newLog);

  // Read all logs
  // const logs = await LogModel.find();
  // console.log(logs);


  Server.start();
}

(async () => {
  main()
})();

