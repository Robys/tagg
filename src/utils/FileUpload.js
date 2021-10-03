import axios from 'axios'
import { useState } from 'react';

export async function HandleFilesUpload(file){
  const [response,SetResponse] = useState(null)

  const files = Object.values(file)
 files.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    //formData.append("tags", `dahwijw8w, medium, gist`);
    formData.append("upload_preset", "lqvmm3lj"); // Replace the preset name with your own
    formData.append("api_key", "316375736115726"); // Replace API key with your own Cloudinary key
   // formData.append("signature", "UyTJCwsJ89rr1ajiPEvWIvz3egc");
    formData.append("timestamp", (Date.now() / 1000) | 0);

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post("https://api.cloudinary.com/v1_1/dahwijw8w/image/upload", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" } }).then(res => SetResponse(res))
  });

  console.log(response)
  //data.secure_url


}
