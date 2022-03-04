import { SignUpHandler } from './sign-up.handler';
import { SignUp } from './sign-up';
import { FakeUserRepository } from '../domain/user.repository.fake';
import { FakeDomainEventDispatcher } from '../../shared/domain/domain-event-dispatcher.fake';

test('it signs up users', () => {
  const repo = new FakeUserRepository();
  const dispatcher = new FakeDomainEventDispatcher();

  const handler = new SignUpHandler(repo, dispatcher);

  handler.handle(
    new SignUp(
      '080e8a03-ab3f-41b5-b7ea-cf10d242b8e5',
      'patrick@test.com',
      'testPsw123',
      true,
    ),
  );

  expect(dispatcher.events).toEqual([
    {
      entityId: '080e8a03-ab3f-41b5-b7ea-cf10d242b8e5',
      payload: {
        id: '080e8a03-ab3f-41b5-b7ea-cf10d242b8e5',
        email: 'patrick@test.com',
      },
    },
  ]);
});
