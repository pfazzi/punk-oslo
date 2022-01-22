export class User {
  constructor(
    private _email: string,
    private _password: string,
    private _privacy: boolean,
  ) {}

  get email(): string {
    return this._email;
  }
}
