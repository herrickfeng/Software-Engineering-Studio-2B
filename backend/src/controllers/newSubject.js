import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { db } from "../helpers/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import {
    successResponse,
    handleApiError
} from "../helpers/apiResponse";

export const newSubject = async (req, res) => {
    try {
        const { subjectName, subjectode } = req.body;
        const data = req.body;

        const id = uuidv4();
        const subjectDoc = await db.collection("subject").doc(id).get();
        
        await firestore.subject.create(subjectDoc, data);

        return res.status(200).json(
            successResponse({
                msg: "Subject created successfully",
                subjectId: id
            })
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getSubject = async (req, res) => {
    try {
      const id = req.params.id;
      
      const subjectDoc = await db.collection("subject").doc(id).get();

      return res.status(200).json({
        result: "Success",
        msg: "hello",
        id: id,
        subjectId: subjectDoc.subjectId, 
        subjectName: subjectDoc.subjectName,
        ...subjectDoc.data()
      }
      );
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        result: "Failed",
        msg: error
      }
      );
    }
  };

  export const updateSubject = async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      console.log(id);
  
      const subjectDoc = await db.collection("subject").doc(id).get();
  
      await firestore.subject.update(subjectDoc, data);
  
      return res.status(200).json({
        result: "Success",
        msg: "created an example record",
        id: id,
        data: data
      }
      );
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        result: "Failed",
        msg: error
      }
      );
    }
  };