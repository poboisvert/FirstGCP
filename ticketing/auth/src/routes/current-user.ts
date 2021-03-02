import express from "express";

// Setup router
const router = express.Router();

// Action from router
router.get("/api/users/currentuser", (req, res) => {
  res.send("Working again PAL - curr-user");
});

// Export the route and rename. Can't use router for all
export { router as currentUserRouter };
