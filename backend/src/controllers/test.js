export const test = async (req, res) => {
  return res.status(200).json({
      msg: "Test router"
    }
  );
};
