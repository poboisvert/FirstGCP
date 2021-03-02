import express from "express";

// Setup router
const router = express.Router();

// Action from router
router.get("/api/users/signin", (req, res) => {
  res.send("Working again PAL - signin");
});

// Export the route and rename. Can't use router for all
export { router as signinRouter };
