import { FakeUserRepository } from '../domain/user.repository.fake';
import { FakeDomainEventDispatcher } from '../../shared/domain/domain-event-dispatcher.fake';
import { Delete } from './delete';
import { DeleteHandler } from './delete.handler';
import { User } from '../domain/user';
import { UserHasBeenDeleted } from '../domain/user-has-been-deleted.event';

test('it deletes users', async () => {
  const repo = new FakeUserRepository(
    new Map<string, User>([
      [
        '080e8a03-ab3f-41b5-b7ea-cf10d242b8e5',
        User.fromState({
          id: '080e8a03-ab3f-41b5-b7ea-cf10d242b8e5',
          email: 'patrick@test.com',
          password: 'test',
          privacy: true,
          active: true,
        }),
      ],
    ]),
  );

  const dispatcher = new FakeDomainEventDispatcher();

  const handler = new DeleteHandler(repo, dispatcher);

  await handler.handle(new Delete('080e8a03-ab3f-41b5-b7ea-cf10d242b8e5'));

  expect(dispatcher.events.pop()).toEqual({
    entityId: '080e8a03-ab3f-41b5-b7ea-cf10d242b8e5',
    payload: new UserHasBeenDeleted('080e8a03-ab3f-41b5-b7ea-cf10d242b8e5'),
  });
});
