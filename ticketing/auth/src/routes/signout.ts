import express from "express";

// Setup router
const router = express.Router();

// Action from router
router.get("/api/users/signout", (req, res) => {
  res.send("Working again PAL - signout");
});

// Export the route and rename. Can't use router for all
export { router as signoutRouter };
