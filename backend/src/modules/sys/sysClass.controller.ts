import { Request, Response } from "express";
import { SysClassService } from "./sysClass.service";


const service = new SysClassService();


export class SysClassController {
static async create(req: Request, res: Response) {
const out = await service.createClass(req.body);
res.json(out);
}


static async delete(req: Request, res: Response) {
const out = await service.deleteClass(req.params.classUID);
res.json(out);
}


static async addFeature(req: Request, res: Response) {
const out = await service.addFeature(req.params.classUID, req.body);
res.json(out);
}


static async inherit(req: Request, res: Response) {
const { parentUID, childUID, metaclassUID } = req.body;
const out = await service.inheritClass(parentUID, childUID, metaclassUID);
res.json(out);
}


static async list(req: Request, res: Response) {
const out = await service.listClasses();
res.json(out);
}
}