import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthContoller";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corti, minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los passwords no sin iguales");
    }
    return true;
  }),
  body("email").isEmail().withMessage("E-mail no valido"),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("El token no puede ir vacio"),
  handleInputErrors,
  AuthController.confirmAccount
);

export default router;
