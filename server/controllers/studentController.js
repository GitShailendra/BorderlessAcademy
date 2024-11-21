const Student = require("../models/Students")
const Guardian = require("../models/Guardian")
exports.registerStudent = async (req, res) => {

  try {
    const guardian = await Guardian.findById(req.body.guardianId);
    if (!guardian) {
      return res.status(404).json({
        success: false,
        message: "Guardian not found"
      });
    }

    const studentData = {
      guardian:req.body.guardianId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      grade: req.body.grade,
      countryOfResidence: req.body.countryOfResidence,
      nationality: req.body.nationality,
      preferredLanguage: req.body.preferredLanguage,
      photo: req.body.photo, // Now just accepting photo as string
      studentId: req.body.studentId || undefined // Use the provided ID or let MongoDB generate it
    };
    
    const student = new Student(studentData);
    await student.save();
    await Guardian.findByIdAndUpdate(
      req.body.guardianId,
      { 
        $push: { students: student._id }
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      data: student,
      message: "Student registered successfully",
    });
  } catch (error) {
    console.error("Error in registerStudent:", error);
    res.status(500).json({
      success: false,
      message: "Error registering student",
      error: error.message,
    });
  }
};
