import { placeholder } from './placeholder';

describe('Placeholder function', () => {
  it('is a placeholder which returns boolean', async () => {
    const result = await placeholder();
    expect(result).toEqual(true);
  });
});
