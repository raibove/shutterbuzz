import { getStore } from "@netlify/blobs";

export async function handler(req, context) {
  const body = JSON.parse(req.body);
  const user = body.user;
  console.log(user)
  const date = body.date;

  const fileData = body.file;
  const description = body.description;

  const store = getStore({ name: user, siteID: '9761082c-38c3-411b-b519-87699c9eff88', token: '' });
  console.log(store)
  try {
    const userUploadKey = 'img' + date;
    await store.setJSON(userUploadKey,
      {
        file: fileData
      }, { metadata: { description } });

    // Respond with a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully" })
    };
  } catch (error) {
    // If there's an error, respond with an error message
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error uploading file" })
    };  
  }
}