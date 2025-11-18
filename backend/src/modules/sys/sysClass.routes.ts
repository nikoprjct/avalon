import { Router } from "express";
import { SysClassController } from "./sysClass.controller";


const router = Router();


router.get("/", SysClassController.list);
router.post("/", SysClassController.create);
router.delete("/:classUID", SysClassController.delete);
router.post("/:classUID/feature", SysClassController.addFeature);
router.post("/inherit", SysClassController.inherit);


export default router;