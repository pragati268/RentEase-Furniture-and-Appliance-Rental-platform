import bookingModel from "../models/booking-model.js";
import userModel from "../models/user-model.js";
import productModel from "../models/product-model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const totalUsers = await userModel.countDocuments({ role: "user" });
    const activeRentals = await bookingModel.countDocuments({ status: "active" });

    const bookings = await bookingModel.find({ status: { $ne: "cancelled" } });
    const monthlyRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    const recentBookings = await bookingModel.find()
      .populate("user", "fullname email")
      .populate("product", "name images")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await userModel.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: { totalProducts, totalUsers, activeRentals, monthlyRevenue },
      recentBookings,
      recentUsers,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAdminBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find()
      .populate("user", "fullname email")
      .populate("product", "name images pricePerMonth category")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "active", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    const booking = await bookingModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "fullname email")
     .populate("product", "name images");

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await userModel.find()
      .select("-password")
      .sort({ createdAt: -1 });

    const usersWithCounts = await Promise.all(users.map(async (user) => {
      const bookingCount = await bookingModel.countDocuments({ user: user._id });
      return {
        ...user.toObject(),
        bookingCount,
      };
    }));

    res.status(200).json(usersWithCounts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await bookingModel.deleteMany({ user: req.params.id });

    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
