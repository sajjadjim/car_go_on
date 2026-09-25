import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://next_js_users:NFqaMCDeDNS67BHX@sajjadjim15.ac97xgz.mongodb.net/?retryWrites=true&w=majority&appName=SajjadJim15`;

let cachedClient = null;

function getClient() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  return cachedClient;
}

function dbConnect(collectionName) {
  const client = getClient();
  const dbName = process.env.DB_NAME || "car_go_on";
  return client.db(dbName).collection(collectionName);
}

export default dbConnect;