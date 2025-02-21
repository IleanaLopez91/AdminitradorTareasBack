import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import {
  hasAuthorization,
  taskBelongsToProject,
  validateTaskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();
router.use(authenticate);

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
  hasAuthorization,
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatoria"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", validateTaskExists);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("ID no valido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es Obligatoria"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  param("taskId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID no valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  TaskController.updateStatus
);

/**Routes for teams */

router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("E-mail no valido"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail
);

router.get("/:projectId/team", TeamMemberController.getProjectTeam);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TeamMemberController.addMemberById
);

router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TeamMemberController.removeMemberById
);

export default router;
