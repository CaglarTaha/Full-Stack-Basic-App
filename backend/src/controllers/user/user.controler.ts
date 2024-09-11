// src/controllers/admin/spo.controller.ts
import { Request, Response } from 'express';

import { validate } from '../../utils/common.utils';
import { UserServices } from '../../services/user.service';
import { User } from '../../entity/user.entity';
import { number } from 'joi';
import { loginUserResponseValidator, loginUserValidator, userInputValidator, userResponseValidator } from '../../validators/user.validator';
import { mapToUser } from '../../utils/user.utils';
export class UserController {

  static async getAllUsers(req: Request, res: Response) {
    try {
      const AllUsers = await UserServices.getAllUsers();
      res.json(AllUsers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const { email, password } = validate(req.body, loginUserValidator);

      const user = await UserServices.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async LoginUser(req: Request, res: Response) {
    const { email, password } = validate(req.body, loginUserValidator);
    const { user, token } = await UserServices.login(email, password);

    res.json(validate({ data: mapToUser(user), token }, loginUserResponseValidator));
  }

  static async createUser(req: Request, res: Response) {

      const data = validate(req.body, userInputValidator);
      const newUser = await UserServices.createUser(data);
      res.status(201).json(validate({ data: mapToUser(newUser) }, userResponseValidator));

  }

  static async publicCreateUser(req: Request, res: Response) {

    const data = validate(req.body, userInputValidator);
    const newUser = await UserServices.publicUserCreate(data);
    res.status(201).json(validate({ data: mapToUser(newUser) }, userResponseValidator));

}


  static async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = validate(req.body, userInputValidator);
      const UpdatedUser = await UserServices.updateUser(id,data);
      if (!UpdatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(validate({ data: mapToUser(UpdatedUser) }, userResponseValidator));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await UserServices.deleteUser(id); // Kullanıcıyı sil
      res.status(204).send(); // Başarılı şekilde silindiğini belirt
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' }); // Sunucu hatası durumunda geri dön
    }
  }

}
