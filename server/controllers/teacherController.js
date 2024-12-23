const Teacher = require('../models/Teachers');
const Grade = require('../models/Grades');
const Subject = require('../models/Subject');
const Class = require('../models/Classes');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.registerTeacher = async (req, res) => {
    let teacher = null;
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            alternatePhone,
            address,
            dateOfBirth,
            gender,
            nationality,
            nationalId,
            profilePhoto,
            highestQualification,
            licenseNumber,
            yearsExperience,
            subjectsToTeach,
            gradeLevels,
            languages,
            specialEducation,
            technologySkills,
            availability,
            preferredHours,
            password,
            resume,
            educationalCertificates,
            teachingCertifications
        } = req.body;

        // Check for existing teacher
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            // 1. Create the teacher
            teacher = await Teacher.create({
                firstName,
                lastName,
                email,
                phoneNumber,
                alternatePhone,
                address,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                nationality,
                nationalId,
                profilePhoto,
                highestQualification,
                licenseNumber,
                yearsExperience: parseInt(yearsExperience),
                subjectsToTeach: Array.isArray(subjectsToTeach) ? subjectsToTeach : [subjectsToTeach],
                gradeLevels: Array.isArray(gradeLevels) ? gradeLevels : [gradeLevels],
                languages: Array.isArray(languages) ? languages : languages ? [languages] : [],
                specialEducation,
                technologySkills,
                availability,
                preferredHours,
                password: hashedPassword,
                resume,
                educationalCertificates,
                teachingCertifications
            });

            // 2. Update grades with new teacher
            const gradeLevelsArray = Array.isArray(gradeLevels) ? gradeLevels : [gradeLevels];
            await Grade.updateMany(
                { grade: { $in: gradeLevelsArray.map(grade => parseInt(grade)) } },
                { $addToSet: { teachers: teacher._id } },
                { upsert: true }
            );

            // 3. Update subjects for selected subjects and grades
            const subjectsArray = Array.isArray(subjectsToTeach) ? subjectsToTeach : [subjectsToTeach];
            const subjectUpdateResult = await Subject.updateMany(
                {
                    name: { $in: subjectsArray },
                    grade: { $in: gradeLevelsArray.map(grade => parseInt(grade)) }
                },
                { $addToSet: { teachers: teacher._id } } // Changed from 'teacher' to 'teachers'
            );

            // 4. Update teacher's subjects field
            const updatedSubjects = await Subject.find({
                name: { $in: subjectsArray },
                grade: { $in: gradeLevelsArray.map(grade => parseInt(grade)) }
            });

            await Teacher.findByIdAndUpdate(
                teacher._id,
                { $addToSet: { subjects: { $each: updatedSubjects.map(s => s._id) } } }
            );

            console.log(`Updated ${subjectUpdateResult.modifiedCount} subjects for teacher`);

            // Generate token
            const token = generateToken(teacher._id);

            res.status(201).json({
                success: true,
                message: 'Teacher registered successfully',
                token,
                data: {
                    id: teacher._id,
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    email: teacher.email,
                    role: teacher.role
                }
            });

        } catch (error) {
            // If any operation fails, attempt cleanup
            if (teacher && teacher._id) {
                await Teacher.findByIdAndDelete(teacher._id);
                await Grade.updateMany({}, { $pull: { teachers: teacher._id } });
                await Subject.updateMany(
                    {}, 
                    { $pull: { teachers: teacher._id } } // Changed from 'teacher' to 'teachers'
                );
            }
            throw error;
        }

    } catch (error) {
        console.error('Teacher registration error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate field value entered',
                error: Object.keys(error.keyPattern).map(key => `${key} already exists`).join(', ')
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                error: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error registering teacher',
            error: error.message
        });
    }
};
exports.loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find teacher
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(teacher._id);
        console.log(teacher)
        res.status(200).json({
            success: true,
            token,
            data: {
                id: teacher._id,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email
            },
            role:teacher.role,
            user:teacher
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};
exports.getTeacherClasses = async (req, res) => {
    try {
        const teacherId = req.user._id; // Assuming you have authentication middleware
        console.log(teacherId)
        const classes = await Class.find({ teacher: teacherId })
            .populate('subject', 'name')
            .populate('students', 'firstName lastName')
            .sort({ createdAt: -1 });

        // Get total stats
        const totalClasses = classes.length;
        const totalStudents = classes.reduce((sum, cls) => sum + cls.students.length, 0);
        const totalTeachingHours = classes.length * 2; // Assuming 2 hours per class per week

        res.status(200).json({
            success: true,
            data: {
                classes,
                stats: {
                    totalClasses,
                    totalStudents,
                    teachingHours: `${totalTeachingHours}/week`
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching classes',
            error: error.message
        });
    }
};
// controllers/classController.js
exports.createClass = async (req, res) => {
    try {
        const {
            name,
            section,
            subject, // This will be the subject name (e.g., "Mathematics")
            schedule,
            meetingLink,
            grade,
            description
        } = req.body;

        const teacherId = req.user._id;
        console.log('teacher id',teacherId)
        console.log('subject is created',name)
        // 1. First verify if teacher is authorized to teach this subject
        const teacher = await Teacher.findById(teacherId);
        if (!teacher.subjectsToTeach.includes(subject)) {
            return res.status(403).json({
                success: false,
                message: `You are not authorized to teach ${subject}`
            });
        }

        // 2. Find the corresponding subject document
        const subjectDoc = await Subject.findOne({ 
            name: subject,
            grade: grade,
            teachers: teacherId
        });

        if (!subjectDoc) {
            return res.status(404).json({
                success: false,
                message: `Subject ${subject} for grade ${grade} not found or not assigned to you`
            });
        }

        // 3. Create new class
        const newClass = await Class.create({
            name,
            section,
            subject: subjectDoc._id, // Use the subject document's ID
            teacher: teacherId,
            schedule,
            meetingLink,
            grade,
            description,
            academicYear: new Date().getFullYear().toString(),
            students: [],
            progress: 0
        });

        // 4. Populate necessary fields for response
        const populatedClass = await Class.findById(newClass._id)
            .populate('subject', 'name')
            .populate('teacher', 'firstName lastName');

        res.status(201).json({
            success: true,
            message: 'Class created successfully',
            data: populatedClass
        });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating class',
            error: error.message
        });
    }
};
exports.getStudents = async (req, res) => {
    try {
        const teacherId = req.user._id; // Assuming you have authentication middleware
        console.log('this is teacher id',teacherId)
        // Find all subjects where the teacher is assigned
        const subjects = await Subject.find({ teachers: teacherId })
            .populate({
                path: 'students',
                select: 'firstName lastName email grade attendance performance lastActive profilePhoto', // Add fields you want to get from Student model
            })
            .select('name grade students');

        // Process subjects to get unique students
        const studentsMap = new Map();
        let totalStudents = 0;

        subjects.forEach(subject => {
            subject.students.forEach(student => {
                if (!studentsMap.has(student._id.toString())) {
                    studentsMap.set(student._id.toString(), {
                        id: student._id,
                        name: `${student.firstName} ${student.lastName}`,
                        grade: `${subject.grade}th Grade`,
                        avatar: student.profilePhoto || "/api/placeholder/32/32",
                        attendance: student.attendance ? `${student.attendance}%` : "N/A",
                        performance: student.performance || "N/A",
                        lastActive: student.lastActive || "Never",
                        email: student.email,
                        subjects: [subject.name]
                    });
                    totalStudents++;
                } else {
                    // If student already exists, just add the subject
                    const existingStudent = studentsMap.get(student._id.toString());
                    if (!existingStudent.subjects.includes(subject.name)) {
                        existingStudent.subjects.push(subject.name);
                    }
                }
            });
        });

        // Convert map to array
        const students = Array.from(studentsMap.values());

        res.status(200).json({
            success: true,
            data: {
                total: totalStudents,
                students
            }
        });

    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching students',
            error: error.message
        });
    }
};
