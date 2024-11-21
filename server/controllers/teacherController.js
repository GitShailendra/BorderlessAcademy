const Teacher = require("../models/Teachers")
exports.registerTeacher = async (req,res)=>{
    try{
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
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }
        const teacher = await Teacher.create({
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
            password,
            resume,
            educationalCertificates,
            teachingCertifications
        });
        res.status(201).json({
            success: true,
            message: 'Teacher registered successfully',
            data: teacher
        });
    }catch (error) {
        console.error('Teacher registration error:', error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate field value entered',
                error: Object.keys(error.keyPattern).map(key => `${key} already exists`).join(', ')
            });
        }

        // Handle validation errors
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
}