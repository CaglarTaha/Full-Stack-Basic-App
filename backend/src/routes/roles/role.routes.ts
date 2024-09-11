import express, { Router } from "express";
import asyncWrap from "express-async-wrap";
import { RoleController } from "../../controllers/role/role.controler"; // RoleController dosyasının yolu ve adını projenize göre güncelleyin
import { authenticateToken } from "../../middleware/auth.middleware"; // authenticateToken fonksiyonunun yolu ve adını projenize göre güncelleyin
const router: Router = express.Router();

/**
 * @swagger
 * /admin/AllRoles:
 *   get:
 *     summary: Get a list of all roles
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with the list of roles
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleListResponse'
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  "/admin/AllRoles",
  asyncWrap(RoleController.getAllRoles),
  authenticateToken(["Admin"]),
);

/**
 * @swagger
 * /admin/roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the role to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the role data
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleResponse'
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  "/admin/roles/:id",
  authenticateToken(["Admin"]),
  asyncWrap(RoleController.getRoleById)
);

/**
 * @swagger
 * /admin/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Role object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       '201':
 *         description: Successful response with the created role data
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleResponse'
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  "/admin/roles",
  authenticateToken(["Admin"]),
  RoleController.createRole
);

/**
 * @swagger
 * /admin/UpdateRoles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the role to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated role object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       '200':
 *         description: Successful response with the updated role data
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleResponse'
 *       '400':
 *         description: Bad request, invalid input data
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal Server Error
 */
router.put(
  "/admin/UpdateRoles/:id",
  authenticateToken(["Admin"]),
  RoleController.updateRole
);

/**
 * @swagger
 * /admin/DeleteRole/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the role to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successful response, no content
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete(
  "/admin/DeleteRole/:id",
  authenticateToken(["Admin"]),
  RoleController.deleteRole
);

export default router;
