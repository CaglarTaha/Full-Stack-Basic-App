import express, { Router } from "express";
import asyncWrap from "express-async-wrap";
import { TaskControler } from "../../controllers/task/task.controler"; // TaskControler dosyasının yolu ve adını projenize göre güncelleyin
import { authenticateToken } from "../../middleware/auth.middleware"; // authenticateToken fonksiyonunun yolu ve adını projenize göre güncelleyin

const router: Router = express.Router();

/**
 * @swagger
 * /admin/AllTasks:
 *   get:
 *     summary: Get a list of all tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with the list of tasks
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskListResponse'
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  "/admin/AllTasks",
  authenticateToken(["Admin"]),
  asyncWrap(TaskControler.getAllTask)
);

/**
 * @swagger
 * /admin/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the task data
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskResponse'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  "/admin/tasks/:id",
  authenticateToken(["Admin"]),
  asyncWrap(TaskControler.getTaskById)
);

/**
 * @swagger
 * /admin/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Task object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '201':
 *         description: Successful response with the created task data
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskResponse'
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  "/admin/tasks",
  authenticateToken(["Admin"]),
  TaskControler.createTask
);

/**
 * @swagger
 * /admin/UpdateTasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated task object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '200':
 *         description: Successful response with the updated task data
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskResponse'
 *       '400':
 *         description: Bad request, invalid input data
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal Server Error
 */
router.put(
  "/admin/UpdateTasks/:id",
  authenticateToken(["Admin"]),
  TaskControler.updateTask
);

/**
 * @swagger
 * /admin/DeleteTask/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successful response, no content
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete(
  "/admin/DeleteTask/:id",
  authenticateToken(["Admin"]),
  TaskControler.deleteTask
);

export default router;
