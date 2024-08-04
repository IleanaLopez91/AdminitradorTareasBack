import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),
  body("clientName").notEmpty().withMessage("El Cliente es Obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es Obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del Proyecto es Obligatorio"),
  body("clientName").notEmpty().withMessage("El Cliente es Obligatorio"),
  body("description").notEmpty().withMessage("La descripcion es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProyect
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.deleteProyect
);

router.param("projectId", validateProjectExists);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatoria"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.getTaskById
);

export default router;
