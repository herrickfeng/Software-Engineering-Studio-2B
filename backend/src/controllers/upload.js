import { store } from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { successResponse, handleApiError, errorResponse } from "../helpers/apiResponse";

export const UploadImage = async (req, res) => {
  console.log("\nbeginning")

  try {
    const uuid = uuidv4();
    let bucketFile = store.file(req.file.originalname);
    console.log(req.file.mimetype);

    if (req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/bmp" ||
      req.file.mimetype === "image/png" ||
      req.file.mimetype === "image/tiff" ||
      req.file.mimetype === "image/webp") {

      const metadata = {
        metadata: {
          contentType: req.file.mimetype,
          firebaseStorageDownloadTokens: uuid,
        }
      };

      await bucketFile.save(req.file.buffer, function (err) {
        if (err) {
          console.log(err);
          return err;
        }
        else {
          console.log("Uploaded!");
          bucketFile.setMetadata(metadata, function (err, apiResponse) {
            if (err) {
              return err
            }
          });
          return res.status(200).json(
            successResponse()
          );
        }
      })
    }
    else {
      return res.status(422).json(
        errorResponse(
          'Incorrect file type uploaded', 422
        )
      );
    }
  }
  catch (error) {
    return handleApiError(res, error);
    console.log("did an oopsie at the back ( ${ error })");
  }
}