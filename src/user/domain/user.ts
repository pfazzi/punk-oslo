import { DomainEvent } from '../../shared/domain/domain-event';
import { UserHasSignedUp } from './user-has-signed-up.event';
import { UserHasBeenDeleted } from './user-has-been-deleted.event';
import { EventRecorder } from '../../shared/domain/event-recorder';

export class User extends EventRecorder {
  private _id: string;
  private _email: string;
  private _password: string;
  private _privacy: boolean;
  private _active = true;

  public static singUp(
    id: string,
    email: string,
    password: string,
    privacy: boolean,
  ): User {
    const newUser = new User();

    newUser._id = id;
    newUser._email = email;
    newUser._password = password;
    newUser._privacy = privacy;

    newUser.recordThat(
      new DomainEvent<any>(
        newUser._id,
        new UserHasSignedUp(newUser._id, newUser._email),
      ),
    );

    return newUser;
  }

  delete() {
    this._active = false;

    this.recordThat(
      new DomainEvent(this._id, new UserHasBeenDeleted(this._id)),
    );
  }

  static fromState({
    id,
    email,
    password,
    privacy,
    active,
  }: {
    id: string;
    email: string;
    password: string;
    privacy: boolean;
    active: boolean;
  }): User {
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
