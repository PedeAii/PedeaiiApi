import { sign } from 'jsonwebtoken';
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

export class Cryptography {
    private static timestamp = Date.now() / 1000;
    /**
     * @description hash password
     * @param {string} password
     * @returns string
     */
    public static async hashPassword(password: string) {
        const salt = randomBytes(16).toString("base64");
        const hash = await new Promise<Buffer>((resolve, reject) => {
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey);
            });
        });

        return `${salt}@${hash.toString("base64")}`;
    }

    /**
     * @description compare password
     * @param {string} password senha provida no corpo da requisição
     * @param {string} userPassword senha do banco
     * @returns boolean
     */
    public static async comparePassword(password: string, userPassword: string) {
        const [salt, key] = userPassword.split("@");

        const hashedBuffer = await new Promise<Buffer>((resolve, reject) => {
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey);
            });
        });

        const keyBuffer = Buffer.from(key, "base64");

        return timingSafeEqual(hashedBuffer, keyBuffer);
    }

  /**
   * @description generate ulid
   * @returns string
   */
  public static ulid(): string {
    const timestamp = Math.floor(this.timestamp).toString(36);
    const randomness = randomBytes(10).toString('hex');

    return `${timestamp}${randomness}`;
  }

  public static jwtEncoded(value: string) {
    return sign(value, process.env.APP_SECRET as string)
  }
}
