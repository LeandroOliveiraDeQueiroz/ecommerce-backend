import * as bcrypt from 'bcryptjs';

export class Encrypter {
  private static readonly SALT_ROUNDS = 10;

  static async encrypt(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);

    const hash = await bcrypt.hash(text, salt);

    return hash;
  }

  static async compare(text: string, encryptText: string): Promise<boolean> {
    return bcrypt.compare(text, encryptText);
  }
}
