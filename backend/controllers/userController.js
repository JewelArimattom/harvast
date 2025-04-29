import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Helper function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// User Login
const logintUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide email and password" 
            });
        }

        const user = await userModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const token = createToken(user._id);
        
        res.status(200).json({ 
            success: true, 
            message: "Logged in successfully", 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during authentication" 
        });
    }
};

// User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all required fields" 
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide a valid email" 
            });
        }

        if (password.length < 8) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters" 
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User already exists" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const token = createToken(newUser._id);

        res.status(201).json({ 
            success: true, 
            message: "User registered successfully", 
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during registration" 
        });
    }
};

// Admin Login (without password reset)
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide email and password" 
            });
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

        const token = jwt.sign(
            { email: process.env.ADMIN_EMAIL, role: 'admin' }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            success: true, 
            message: "Admin logged in successfully", 
            token 
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during admin authentication" 
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide a valid email address" 
            });
        }

        // Find user without revealing if email exists (security measure)
        const user = await userModel.findOne({ email });
        
        if (user) {
            // Generate secure reset token (valid for 15 minutes)
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 900000; // 15 minutes
            
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = resetTokenExpiry;
            await user.save();

            // Create secure reset link
            const resetUrl = `${process.env.FRONTEND_URL}reset-password?token=${resetToken}&id=${user._id}`;
            
            // Configure email transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            // Send password reset email
            await transporter.sendMail({
                to: user.email,
                from: process.env.EMAIL_FROM,
                subject: 'Password Reset Request',
                html: `
                    <p>You requested a password reset for your account.</p>
                    <p>Click this link to reset your password:</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>This link will expire in 15 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                `
            });
        }

        // Always return same response regardless of email existence
        res.status(200).json({ 
            success: true, 
            message: "If this email exists, a reset link has been sent" 
        });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error processing password reset request" 
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, userId, newPassword } = req.body;

        // Validate inputs
        if (!token || !userId || !newPassword) {
            return res.status(400).json({ 
                success: false, 
                message: "Token, user ID and new password are required" 
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters" 
            });
        }

        // Find user with valid token
        const user = await userModel.findOne({
            _id: userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid or expired token" 
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Password updated successfully" 
        });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error resetting password" 
        });
    }
};


export { 
    logintUser, 
    registerUser, 
    adminLogin, 
    forgotPassword, 
    resetPassword 
};