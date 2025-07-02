import axios from 'axios';

export const UploadImage = async (ImageData) => {
  const UploadImg = new FormData();
  UploadImg.append("file", ImageData);
  UploadImg.append("upload_preset", "Flip_Img"); 
  UploadImg.append("cloud_name", "dll2ppcmu"); 

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dll2ppcmu/image/upload",
      UploadImg
    );
    return response.data.secure_url; 
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};