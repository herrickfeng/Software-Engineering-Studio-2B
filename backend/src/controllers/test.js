export const example = async (req, res) => {
  return res.status(200).json({
      result: "Success",
      msg: "I don't know how to talk to you\nI don't know how to ask you if you're okay\nMy friends always feel the need to tell me things\nSeems like they're just happier than us these days\nYeah, these days I don't know how to talk to you\nI don't know how to be there when you need me\nIt feels like the only time you see me\nIs when you turn your head to the side and look at me differently\n"
    }
  );
};
