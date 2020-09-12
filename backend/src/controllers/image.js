import { store } from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { successResponse, handleApiError, errorResponse } from "../helpers/apiResponse";

export const UploadImage = async (req, res) => {
  try {
    const uuid = uuidv4();
    let bucketFile = store.file(req.file.originalname);

    if (req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/bmp" ||
      req.file.mimetype === "image/png" ||
      req.file.mimetype === "image/tiff" ||
      req.file.mimetype === "image/webp") {

      let testFile = store.file('9uyzaLD235YjRwPxpUunS71gOQW2')
      let fileType = ""
      testFile.exists().then(function (data) {
        const exists = data[0];
        console.log(exists)
      });

      /*
      testFile.getMetadata().then(function (data) {
        const metadata = data[0];
        console.log(metadata.metadata.contentType)
        //const apiResponse = data[1];
        //console.log(apiResponse)
      });
      */

      await testFile.getMetadata().then(function (data) {
        fileType = data[0].metadata.contentType
      });

      console.log(fileType)

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

export const DownloadImage = async (req, res) => {
  try {
    let testFile = store.file('9uyzaLD235YjRwPxpUunS71gOQW2')
    let fileType = ""

    await testFile.getMetadata().then(function (data) {
      fileType = data[0].metadata.contentType
    });

    testFile.download(function (err, contents) {
      //res.set('Content-Type', fileType)
      console.log(contents)
      return res.status(200).send(contents.toString('base64'))
    });

  }
  catch (error){
    console.log(error)
  }



}