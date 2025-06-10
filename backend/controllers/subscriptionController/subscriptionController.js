import createError from "http-errors";
import NewsletterSubscription from "../../models/Subscription/subscription.js";
import User from "../../models/user/user.js";


export const subscriptionAdd = async (req, res, next) => {
  const { email, id } = req.body;

  if (!email || !id) {
    return res.status(400).json({ message: "Email and user ID are required" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingSubscription = await NewsletterSubscription.findOne({
      user: id,
    });
    if (existingSubscription) {
      return res
        .status(400)
        .json({ success: false, message: "You are already subscribed" });
    }

    const newSubscription = new NewsletterSubscription({
      email,
      user: id,
    });

    const savedSubscription = await newSubscription.save();

    res.status(201).json({
      success: true,
      message: "User subscribed successfully",
      data: savedSubscription,
    });
  } catch (error) {
    console.error("Error subscribing user:", error); 
    return next(createError(500, "Server error! Please try again!"));
  }
};
