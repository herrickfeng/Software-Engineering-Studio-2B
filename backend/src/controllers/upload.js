import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { store } from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { successResponse, handleApiError } from "../helpers/apiResponse";
import multiparty from "multiparty";

export const UploadImage = async (req, res) => {
  /*let form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    Object.keys(fields).forEach(function (name) {
      console.log('got field named ' + name);
    });
  });*/
  console.log("\nbeginning")
  //console.log(req)

  try {
    //setShowField(false)
    //setProgressValue(0)
    console.log("up")
    var file = req.body
    console.log(file)
    const uploadFile = store.file(file)

    await store.upload(uploadFile, function (err, file, apiResponse) {
      console.log(err)
    })
    
  }
  catch (error) {
    return handleApiError(res, error);
    console.log("did an oopsie at the back")
  }
}