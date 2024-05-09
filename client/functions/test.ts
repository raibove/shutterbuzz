import { getStore } from "@netlify/blobs";

export async function handler(req, context) {
  // Parse the incoming request body
  const body = JSON.parse(req.body);
  // Extract the file data and description from the request body
  console.log(body)
  const fileData = body.file; // Assuming this is the file data you're sending from the frontend
  const description = body.description;

  // Get the store where you want to store the file
  const store = getStore("your-store-name"); // Replace "your-store-name" with the name of your store

  try {
    // Set the file data in the store
    await store.setJSON("file1", {
      file: fileData
    }, { metadata: { description } });

    // Respond with a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully" })
    };
  } catch (error) {
    // If there's an error, respond with an error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error uploading file" })
    };
  }
}