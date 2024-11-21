import translateRoutes from "./therapyRoutes.jsx";
import express from "express";
const router = express.Router();

router.use("/translate", translateRoutes);

export default router;
