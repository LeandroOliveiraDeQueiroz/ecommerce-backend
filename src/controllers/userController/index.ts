import { Request, Response } from 'express';
import { UserService } from '../../services/user';
import { ApiError, BadRequestError, NotFoundError } from '../../utils';
import { TLoginSchema, TSigninSchema } from '../../dto/userDTO/types';

export class UserController {
  constructor(
    private useService: UserService,
    private signinSchema: TSigninSchema,
    private loginSchema: TLoginSchema
  ) {}

  async signin(req: Request, res: Response) {
    const body = req.body;

    try {
      const { error } = this.signinSchema.validate(body);
      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const name: string = body.name;
      const email: string = body.email;
      const password: string = body.password;

      const signed = await this.useService.create(name, email, password);
      if (signed) res.status(200).send();
      else throw Error();
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }

  async login(req: Request, res: Response) {
    const body = req.body;

    try {
      const { error } = this.loginSchema.validate(body);
      if (error) {
        throw new BadRequestError('Campos invalidos');
      }

      const email: string = body.email;
      const password: string = body.password;

      const result = await this.useService.authenticate(email, password);

      if (!result) {
        throw new NotFoundError('Senha ou email incorretos');
      }

      res.status(200).send(result);
    } catch (error) {
      const apiError = ApiError.handleError(error);
      const { statusCode, message } = apiError;
      res.status(statusCode).send(message);
    }
  }
}
