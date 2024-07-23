import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    try {
      await project.save();
      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
    res.send("Creando los proyectos");
  };
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const proyects = await Project.find({});
      res.json(proyects);
    } catch (error) {
      console.log(error);
    }
    res.send("Todos los proyectos");
  };
}
