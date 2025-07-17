const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 전체 조회
 *     description: 등록된 모든 유저 목록을 반환합니다.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: 유저 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: 홍길동
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 유저 생성
 *     description: 새로운 유저를 등록합니다.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 김철수
 *     responses:
 *       201:
 *         description: 유저 생성 성공
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 특정 유저 조회
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 유저 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 유저 정보 반환
 */


module.exports = router;
