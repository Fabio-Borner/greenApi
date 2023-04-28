const { MongoClient } = require("mongodb");
async function submit() {
  console.log("inSubmit");
  const uri =
    "mongodb+srv://fabioborner:12345@cluster0.g4mtq2f.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    await createListing(client, {
      name: "Lovely Loft",
      summary: "A charming loft in Paris",
      bedrooms: 1000000,
      bathrooms: 1,
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

submit().catch(console.error);

// make API request

async function createListing(client, newListing) {
  console.log("inCreateListing");
  const result = await client
    .db("sample_airbnb")
    .collection("Test")
    .insertOne(newListing);
  console.log(`id : ${result.insertedId}`);
}
export default createListing;
