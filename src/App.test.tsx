import { render } from '@testing-library/react';
import App from './App';

test('renders nonogram', () => {
  const { container } = render(<App />);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstElementChild).toHaveClass("nonogram");
});
