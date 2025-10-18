import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Create transporter
const emailPort = Number(process.env.EMAIL_PORT) || 465;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: emailPort,
  secure: emailPort === 465, // enforce TLS only on SMTPS port
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate verification token
const generateVerificationToken = (userId) => {
  return jwt.sign(
    { userId, type: 'email-verification' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Generate password reset token
const generatePasswordResetToken = (userId) => {
  return jwt.sign(
    { userId, type: 'password-reset' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Send welcome email
export const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: `"Pothole Reporting System" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Welcome to Pothole Reporting System! 🚧',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Pothole Reporter!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your account has been successfully created</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #111827; margin-top: 0;">Hello ${user.name}! 👋</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Thank you for joining our community of road safety advocates! You're now part of a network 
              dedicated to making our roads safer for everyone.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <h3 style="color: #111827; margin-top: 0;">What you can do now:</h3>
              <ul style="color: #374151; line-height: 1.8;">
                <li>📱 Report potholes in your area</li>
                <li>🗺️ View and track reported potholes on the map</li>
                <li>👍 Upvote existing reports</li>
                <li>📊 Track the status of your reports</li>
                <li>💬 Provide feedback and suggestions</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}" 
                 style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                Start Reporting Now
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
              Together, we can make our roads safer! 🛣️
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send welcome email');
  }
};

// Send verification email
export const sendVerificationEmail = async (user) => {
  try {
    const verificationToken = generateVerificationToken(user._id);
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: `"Pothole Reporting System" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Verify Your Email Address - Pothole Reporting System',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Verify Your Email</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Complete your account setup</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #111827; margin-top: 0;">Hello ${user.name}! 👋</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Thank you for registering with Pothole Reporting System! To complete your account setup, 
              please verify your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                Verify Email Address
              </a>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>Important:</strong> This verification link will expire in 24 hours. 
                If you didn't create this account, you can safely ignore this email.
              </p>
            </div>
            
            <p style="color: #374151; font-size: 14px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            <p style="color: #f97316; font-size: 12px; word-break: break-all;">
              ${verificationUrl}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (user) => {
  try {
    const resetToken = generatePasswordResetToken(user._id);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Pothole Reporting System" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Reset Your Password - Pothole Reporting System',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Reset Your Password</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Secure your account</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #111827; margin-top: 0;">Hello ${user.name}! 👋</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              We received a request to reset your password for your Pothole Reporting System account. 
              Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                Reset Password
              </a>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>Security Notice:</strong> This reset link will expire in 1 hour for your security. 
                If you didn't request this password reset, please ignore this email and your password will remain unchanged.
              </p>
            </div>
            
            <p style="color: #374151; font-size: 14px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            <p style="color: #f97316; font-size: 12px; word-break: break-all;">
              ${resetUrl}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send password reset email');
  }
};

// Verify token
export const verifyToken = (token, type) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== type) {
      throw new Error('Invalid token type');
    }
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}; 

// Send contact form email
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    const mailOptions = {
      from: `"Pothole Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'roshan@empoweredindian.in',
      subject: 'New Contact Us Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>New Contact Us Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #ea580c;">
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send contact form email');
  }
}; 
