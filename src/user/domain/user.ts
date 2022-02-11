export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _privacy: boolean;
  private _active = true;

  public static singUp(
    email: string,
    password: string,
    privacy: boolean,
  ): User {
    const newUser = new User();

    newUser._email = email;
    newUser._password = password;
    newUser._privacy = privacy;

    return newUser;
  }

  delete() {
    this._active = false;
  }

  static fromState({ id, email, password, privacy, active }): User {
    const newUser = new User();

    newUser._id = id;
    newUser._email = email;
    newUser._password = password;
    newUser._privacy = privacy;
    newUser._active = active;

    return newUser;
  }

  toState(): {
    id: string;
    email: string;
    password: string;
    privacy: boolean;
    active: boolean;
  } {
    return {
      id: this._id,
      email: this._email,
      password: this._password,
      privacy: this._privacy,
      active: this._active,
    };
  }

  id(): string {
    return this._id;
  }
}
