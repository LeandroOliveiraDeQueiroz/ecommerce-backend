import { IUser } from '../../models';
import { UserRepository } from '../../repository';
import { JWT } from '../../utils';
import { Encrypter } from '../../utils/encrypt';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(name: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await Encrypter.encrypt(password);

    return this.userRepository.insert(name, email, hashedPassword);
  }

  async authenticate(email: string, password: string): Promise<string | null> {
    const params = [{ field: 'email', value: email }];

    console.log('params on autheticate:', params);

    const user = await this.userRepository.get(params);

    console.log('user: ', user);

    if (!user || !user.id) return null;

    const isPasswordCorrect = await Encrypter.compare(password, user.password);

    console.log('isPasswordCorrect: ', isPasswordCorrect);

    if (!isPasswordCorrect) return null;

    const jwtPayload = { id: user.id };

    const accessToken = JWT.generateToken({
      payload: jwtPayload,
      jwtSecret: process.env.JWT_SECRET_KEY || '',
      options: {},
    });

    console.log('accessToken: ', accessToken);

    return accessToken;
  }
}
