import { Contact } from "../models/contact.model.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import nodemailer from "nodemailer";

const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new apiError(400, "Name, email, subject, and message are required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Message: ${subject}`,
    html: `
      <h3>New Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "Not provided"}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b> ${message}</p>
    `
  });

  return res
    .status(201)
    .json({
      statusCode: 201,
      data:contact.toObject(),
      message: "Message sent successfully",
      success: true
  }); 
});

const getUnreadMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find({ isRead: false })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new apiResponse(200, messages, "Unread messages fetched")
  );
});

const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const message = await Contact.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );

  if (!message) {
    throw new apiError(404, "Message not found");
  }

  return res.status(200).json(
    new apiResponse(200, message, "Message marked as read")
  );
});


export {sendMessage,getUnreadMessages,markAsRead}