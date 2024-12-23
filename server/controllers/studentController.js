const Student = require("../models/Students");
const Guardian = require("../models/Guardian");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const Grade = require("../models/Grades");
const Subject = require("../models/Subject");
const Class = require("../models/Classes");
// Register Student
exports.registerStudent = async (req, res) => {
  let student = null;
  try {
    const {
      guardianId,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      grade,
      countryOfResidence,
      nationality,
      preferredLanguage,
      photo,
      studentId,
      password,
      email,
      subjects
    } = req.body;

    // Check if guardian exists
    const guardian = await Guardian.findById(guardianId);
    if (!guardian) {
      return res.status(404).json({
        success: false,
        message: "Guardian not found",
      });
    }

    // Check for existing student
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this ID already exists",
      });
    }

    const existingStudentEmail = await Student.findOne({ email });
    if (existingStudentEmail) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // 1. Create student
      const studentData = {
        guardian: guardianId,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        grade,
        countryOfResidence,
        nationality,
        preferredLanguage,
        photo,
        studentId: studentId || undefined,
        password: hashedPassword,
        email
      };

      student = new Student(studentData);
      await student.save();

      // 2. Find or create grade and add student
      let gradeDoc = await Grade.findOne({ grade: grade });
      if (!gradeDoc) {
        gradeDoc = new Grade({
          grade: grade,
          academicYear: new Date().getFullYear().toString(),
          students: [student._id]
        });
        await gradeDoc.save();
      } else {
        await Grade.findByIdAndUpdate(
          gradeDoc._id,
          { $addToSet: { students: student._id } }
        );
      }

      // 3. Update all subjects for the student's grade
      const subjectUpdateResult = await Subject.updateMany(
        { grade: parseInt(grade) }, // Find all subjects for this grade
        { 
          $addToSet: { 
            students: student._id,
            guardians: guardianId 
          } 
        }
      );

      console.log(`Updated ${subjectUpdateResult.modifiedCount} subjects for grade ${grade}`);

      // 4. Update guardian
      await Guardian.findByIdAndUpdate(
        guardianId,
        { $addToSet: { students: student._id } }
      );

      // Generate token
      const token = generateToken(student._id);
      
      res.status(201).json({
        success: true,
        token,
        data: {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          guardian: guardianId,
          email: student.email,
          role: student.role
        },
        message: "Student registered successfully",
        user: student
      });
    } catch (error) {
      // If any operation fails, try to clean up
      if (student && student._id) {
        await Student.findByIdAndDelete(student._id);
        await Grade.updateMany({}, { $pull: { students: student._id } });
        await Subject.updateMany({}, { $pull: { students: student._id } });
        await Guardian.updateMany({}, { $pull: { students: student._id } });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in registerStudent:", error);
    res.status(500).json({
      success: false,
      message: "Error registering student",
      error: error.message,
    });
  }
};

// Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(student._id);

    res.status(200).json({
      success: true,
      token,
      message: "Logged in successfully",
      data: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
      },
      user:student
    });
  } catch (error) {
    console.error("Error in loginStudent:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in student",
      error: error.message,
    });
  }
};
// controllers/studentController.js

exports.getStudentClasses = async (req, res) => {
  try {
      const studentId = req.user._id; // Assuming you have auth middleware setting req.user
      console.log('Student ID:', studentId);
      // First find all subjects that have this student
      const subjects = await Subject.find({ 
          students: studentId 
      }).select('teachers grade name');

      // Get all unique teacher IDs from these subjects
      const teacherIds = [...new Set(subjects.flatMap(subject => subject.teachers))];

      // Find all classes created by these teachers that match student's subjects and grade
      const classes = await Class.find({ 
          teacher: { $in: teacherIds },
          subject: { $in: subjects.map(s => s._id) },
          grade: { $in: subjects.map(s => s.grade) }
      }).populate([
          {
              path: 'teacher',
              select: 'firstName lastName'
          },
          {
              path: 'subject',
              select: 'name grade'
          }
      ]);

      res.status(200).json({
          success: true,
          data: {
              classes,
              stats: {
                  totalClasses: classes.length,
                  subjects: new Set(classes.map(c => c.subject.name)).size
              }
          }
      });

  } catch (error) {
      console.error('Error fetching student classes:', error);
      res.status(500).json({
          success: false,
          message: 'Error fetching classes',
          error: error.message
      });
  }
};