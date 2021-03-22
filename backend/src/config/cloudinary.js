const cloudinary = require('cloudinary').v2

const UploadFile = async (file) => {

    cloudinary.config({
        cloud_name: "dahwijw8w",
        api_key: "316375736115726",
        api_secret: "UyTJCwsJ89rr1ajiPEvWIvz3egc",
      });
      const options = {allowed_formats: ["jpg","png"],public_id: "",folder:"robert_crud_test"}

      try{
        const  result = await cloudinary.uploader.upload(file,options,(err,result) =>{
            if(err){
                console.log(err)
            }
            return result
        })

        return result

    }
    catch (error){
      throw new Error(error)
    } 

}

module.exports = UploadFile;