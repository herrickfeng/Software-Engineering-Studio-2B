import firestore from "../helpers/firestore";
import { db } from "../helpers/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export const example = async (req, res) => {
  return res.status(200).json({
    result: "Success",
    msg: "I don't know how to talk to you\nI don't know how to ask you if you're okay\nMy friends always feel the need to tell me things\nSeems like they're just happier than us these days\nYeah, these days I don't know how to talk to you\nI don't know how to be there when you need me\nIt feels like the only time you see me\nIs when you turn your head to the side and look at me differently\n"
  }
  );
};

export const createExample = async (req, res) => {
  try {
    const data = req.body;

    const id = uuidv4();
    const exampleDoc = await db.collection("examples").doc(id).get();

    await firestore.example.create(exampleDoc, data);

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

export const getExample = async (req, res) => {
  try {
    const id = req.params.id;
    
    const exampleDoc = await db.collection("examples").doc(id).get();

    return res.status(200).json({
      result: "Success",
      msg: "created an example record",
      id: id,
      ...exampleDoc.data()
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

export const updateExample = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const exampleDoc = await db.collection("examples").doc(id).get();

    await firestore.example.update(exampleDoc, data);

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
