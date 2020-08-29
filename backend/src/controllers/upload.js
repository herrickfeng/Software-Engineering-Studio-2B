import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { store } from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { successResponse, handleApiError } from "../helpers/apiResponse";

export const UploadImage = async (req, res) => {
  console.log("\nbeginning")

  try {
    const uuid = uuidv4();







    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
        contentType: 'images/jpeg'
      }
    };

    let bucketFile = store.file('boaty.JPG');
    let fileInfo = req.body;
    //let fileInfo = form;
    console.log(req.file)

    //store.upload('Boat.JPG')
    //bucketFile.setMetadata(metadata, function (err, apiResponse) { });
    
    await bucketFile.save(fileInfo, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Uploaded!");
        bucketFile.setMetadata(metadata, function (err, apiResponse) { });
        return res.status(200).json(
          successResponse()
        );
      }
    })


    /*
    await store.upload(uploadFile, function (err, file, apiResponse) {
      console.log(err);
    })
    */

  }
  catch (error) {
    return handleApiError(res, error);
    console.log("did an oopsie at the back")
  }
}