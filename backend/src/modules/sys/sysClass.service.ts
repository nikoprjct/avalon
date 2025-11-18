import { AppDataSource } from "../../config/database";
import { SysClass } from "../../entities/SysClass";
import { SysClassFeature } from "../../entities/SysClassFeature";
import { SysClassInher } from "../../entities/SysClassInher";


export class SysClassService {
classRepo = AppDataSource.getRepository(SysClass);
featureRepo = AppDataSource.getRepository(SysClassFeature);
inherRepo = AppDataSource.getRepository(SysClassInher);


async createClass(data: Partial<SysClass>) {
const cls = this.classRepo.create(data);
return this.classRepo.save(cls);
}


async deleteClass(classUID: string) {
return this.classRepo.delete({ classUID });
}


async addFeature(classUID: string, featureData: Partial<SysClassFeature>) {
const cls = await this.classRepo.findOneOrFail({ where: { classUID } });
const feature = this.featureRepo.create({ ...featureData, metaClass: cls });
return this.featureRepo.save(feature);
}


async inheritClass(parentUID: string, childUID: string, metaclassUID: string) {
const inher = this.inherRepo.create({ parentUID, childUID, metaclassUID });
return this.inherRepo.save(inher);
}


async listClasses() {
return this.classRepo.find({ relations: ["features"] });
}
}