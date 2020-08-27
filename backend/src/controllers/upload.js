import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import store from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { successResponse, handleApiError} from "../helpers/apiResponse";

export const UploadImage = async (req, res) => {
	/*try {
		const { email, password, displayName } = req.body;

		//Check if fields are completed
		checkParams({
			email: {
				data: email,
				expectedType: "string"
			},
			password: {
				data: password,
				expectedType: "string"
			},
			displayName: {
				data: displayName,
				expectedType: "string"
			}
		});

		const user = await admin.auth().createUser({ email, password })
		return res.status(200).json(
          successResponse(user)
        );
	} catch (error) {
		return handleApiError(res, error);
	}*/

  try {
    //setShowField(false)
    //setProgressValue(0)
    var file = req.file
    //var file = event.target.files[0]
    var storageRef = store().ref(file.name)
    var task = storageRef.put(file)
    console.log(file)

    /*
    task.on('state_changed',
      function (snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgressValue(percentage)
      },
      function error(err) {
        setShowResult("Something went wrong :(")
        setShowField(true)
        switch (err.code) {
          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object")
            break;

          case 'storage/canceled':
            console.log("User canceled the upload")
            break;

          case 'storage/unknown':
            console.log("Unknown error occurred, inspect error.serverResponse")
            break;

          case 'storage/unauthenticated':
            console.log("User is not authenticated")
            break;
        }
      },
      function (complete) {
        setShowResult("Image Uploaded!")
        setShowField(true)
        console.log("Uploaded!")
      }
    )
  }*/
  catch (error) {
    console.log("did an oopsie")
  }
}