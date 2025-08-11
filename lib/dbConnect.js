import  { MongoClient, ServerApiVersion } from 'mongodb';

function dbConnect (collectionName){
   const uri = `mongodb+srv://next_js_users:NFqaMCDeDNS67BHX@sajjadjim15.ac97xgz.mongodb.net/?retryWrites=true&w=majority&appName=SajjadJim15`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
return client.db(process.env.DB_NAME).collection(collectionName);
}

export default dbConnect;