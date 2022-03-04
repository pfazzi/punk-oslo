import { User } from './user';
import { v4 as uuidv4 } from 'uuid';

describe('User entity', () => {
  test('it returns its state for storage purposes', () => {
    const uuid = uuidv4();

    const user = User.singUp(uuid, 'patrick@test.com', 'randomPassword', true);

    expect(user.toState()).toEqual({
      id: uuid,
      email: 'patrick@test.com',
      password: 'randomPassword',
      privacy: true,
      active: true,
    });
  });

  test('it can sign up', () => {
    const uuid = uuidv4();

    const user = User.singUp(uuid, 'patrick@test.com', 'randomPassword', true);

    expect(user.releaseEvents()).toEqual([
      {
        entityId: uuid,
        payload: {
          id: uuid,
          email: 'patrick@test.com',
        },
      },
    ]);
  });

  test('it can be deleted ', () => {
    const uuid = uuidv4();

    const user = User.singUp(uuid, 'patrick@test.com', 'randomPassword', true);

    user.delete();

    expect(user.releaseEvents().pop()).toEqual({
      entityId: uuid,
      payload: {
        id: uuid,
      },
    });
  });
});
