import { YouthData } from "../models/youthModel.js";

export const createYouthInfo = async (req, res) => {
  try {
    let youthData = req.body;
    console.log(youthData);
    const existingYouth = await YouthData.findOne({ fullName: youthData.fullName });
    if (existingYouth) {
      return res.status(400).json({ message: "Youth data already exists" });
    }

    let newYouth = new YouthData(youthData);
    await newYouth.save();

    res.status(201).json({
      message: "Youth data created successfully",
      data: youthData,
    });
  } catch (error) {
    console.error("Error creating youth data:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllYouthInfo = async (req, res) => {
  try {
    const allYouth = await YouthData.find({});
    res.status(200).json({
      message: "Data retrieved successfully",
      data: allYouth,
    });
  } catch (error) {
    console.error("Error fetching youth data:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getYouthInfoByName = async (req, res) => {
  const youthName = req.params.fullName;
  if (!youthName) {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  try {
    const youth = await YouthData.find({ fullName: youthName })
    if (!youth) {
      return res
        .status(404)
        .json({ message: "Youth data does not exist on our database!" });
    }
    res.status(200).json({
      message: "Youth data retrieved successfully",
      data: youth,
    });
  } catch (error) {
    console.error("Error fetching youth data by ID:", error);
    res.status(400).json({
      message: "Name does not exist in database",
      error: error.message,
    });
  }
};

export const updateYouthInfo = async (req, res) => {
    const youthName = req.params.fullName;
    const updatedData = req.body;

    try {
        const updatedYouth = await YouthData.findOneAndUpdate(
            { fullName: youthName },
            updatedData,
            { new: true }
        );

        if (!updatedYouth) {
            return res.status(404).json({
                message: "Youth data not found",
            });
        }

        res.status(200).json({
            message: "Youth data updated successfully",
            data: updatedYouth,
        });
    } catch (error) {
        console.error("Error updating youth data:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
