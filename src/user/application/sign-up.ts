export class SignUp {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly privacy: boolean,
  ) {}
}
