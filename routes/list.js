const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({ title, body, user: existingUser._id });
    await list.save();

    existingUser.list.push(list._id);
    await existingUser.save();

    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, userId } = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await List.findOne({ _id: req.params.id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found for this user" });
    }

    task.title = title;
    task.body = body;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    const existingUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { list: req.params.id } }
    );

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedList = await List.findByIdAndDelete(req.params.id);

    if (!deletedList) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (list.length === 0) {
      return res.status(200).json({ message: "No tasks found" });
    }
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
