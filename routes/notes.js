const router = require("express").Router();
const User = require("../models/userTasks");
const { checkUser } = require("../middleware/authmiddleware");

router.route("/").get(checkUser, (req, res) => {
  if (req.Status == true) {
    User.findOne({ phone: req.phone })
      .then((docNotes) => res.json(docNotes.notes))
      .catch((err) => res.status(400).json(err));
    // res.json("sucess");
  } else {
    res.status(400).json("error");
  }
});

router.route("/:id").get(checkUser, async (req, res) => {
  const noteId = req.params.id;

  if (req.Status) {
    try {
      const user = await User.findOne({ phone: req.phone });

      if (!user) console.error("user not find");

      const note = user.notes.id(noteId); // Find the note by noteId within the user's notes array
      if (!note) {
        console.error("Note not found");
      }
      //   console.log(note);
      res.json(note);
    } catch (error) {
      console.log(error);
    }
  }
});

router.route("/add").post(checkUser, async (req, res) => {
  const note = {
    title: req.body.title,
    discription: req.body.discription,
    due_date: req.body.due_date
  };
  if (req.Status) {
    try {
      const user = await User.findOne({ phone: req.phone });

      if (!user) console.error("user not find");

      user.notes.push(note);
      const newnote=await user.save();
      res.json(newnote.notes.slice(-1)[0]);
    } catch (err) {
      console.log(err);
    }
  }
});

router.route("/update/:id").post(checkUser, async (req, res) => {
  const title = req.body.title;
  const discription = req.body.discription;
  const taskId = req.params.id;

  if (req.Status) {
    try {
      const user = await User.findOne({ phone:req.phone }); // Find the user by email
      if (!user) {
        console.log("User not found");
        return;
      }

      const task = user.notes.id(taskId); // Find the note by noteId within the user's notes array
      if (!task) {
        console.error("Note not found");
      }

      // Update the note with the updatedData
      task.title = title;
      task.discription = discription;

      await user.save(); // Save the updated user object to the database

      res.json({status:true});
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
});

router.route("/delete/:id").delete(checkUser, async (req, res) => {
  const taskId = req.params.id;

  if (req.Status) {
    try {
      const user = await User.findOne({ phone: req.phone });

      if (!user) console.error("user not find");

      const noteIndex = user.notes.findIndex(
        (note) => note._id.toString() === noteId
      );
      if (noteIndex === -1) {
        console.error("Note not found");
      }
      // Remove the note from the user's notes array
      user.notes.splice(noteIndex, 1);

      // Save the updated user
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
