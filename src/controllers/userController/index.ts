import Joi from 'joi';
import { Request, Response } from 'express';
import { UserService } from '../../services/user';
// import { IUser } from '../models';

export class UserController {
  constructor(
    private useService: UserService,
    private signinSchema: TSigninSchema,
    private loginSchema: TLoginSchema
  ) {}

  async signin(req: Request, res: Response) {
    // console.log( req.path)
    const body = req.body;
    const { error } = this.signinSchema.validate(body);
    if (error) {
      res.status(400).send();
      return;
    }

    try {
      const name: string = body.name;
      const email: string = body.email;
      const password: string = body.password;

      const signed = await this.useService.create(name, email, password);
      console.log('Signed: ', signed);
      if (signed) res.status(200).send();
      else res.status(400).send();
    } catch (error) {
      console.log('error', error);
      res.status(500).send();
    }
  }

  async login(req: Request, res: Response) {
    const body = req.body;
    const { error } = this.loginSchema.validate(body);
    if (error) {
      res.status(401).send();
      return;
    }

    try {
      const email: string = body.email;
      const password: string = body.password;

      // const jwt =
      const result = await this.useService.authenticate(email, password);

      if (!result) {
        res.status(401).send();
        return;
      }

      res.status(200).send(result);
    } catch (error) {
      res.status(500);
      console.log('error', error);
    }
  }
}

type TSigninSchema = Joi.ObjectSchema<{
  name: Joi.StringSchema<string>;
  email: Joi.StringSchema<string>;
  password: Joi.StringSchema<string>;
}>;

type TLoginSchema = Joi.ObjectSchema<{
  email: Joi.StringSchema<string>;
  password: Joi.StringSchema<string>;
}>;
