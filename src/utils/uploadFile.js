const { gcpUpload } = require("./gcpUpload");

exports.uploadFile = async (files) => {
  try {
    const uploadedFiles = [];

    for (const file of files) {
      const matches = file.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        throw new Error("Invalid Base64 file format.");
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, "base64");

      if (!mimeType.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
      }

      const extension = mimeType.split("/")[1];
      const uploadFile = {
        name: `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${extension}`,
        data: buffer,
      };

      const uploadPath = "/images";
      const uploadResponse = await gcpUpload(uploadFile, uploadPath);
      console.log("File uploaded successfully:", uploadResponse);

      uploadedFiles.push(uploadResponse?.path);
    }

    return uploadedFiles; // Return array of uploaded file URLs/responses
  } catch (error) {
    console.error("Error uploading files:", error.message);
    throw error;
  }
};
