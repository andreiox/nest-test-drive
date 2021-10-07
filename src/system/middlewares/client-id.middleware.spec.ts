import { ClientIdMiddleware } from './client-id.middleware';

describe('ClientIdMiddleware', () => {
  it('should be defined', () => {
    expect(new ClientIdMiddleware()).toBeDefined();
  });
});
