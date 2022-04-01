import React from 'react';
import { render } from '@testing-library/react';
import TicTacToe from './TicTacToe';

test('renders next player text', () => {
  const { getByText } = render(<TicTacToe />);
  const linkElement = getByText(/Next Player/i);
  expect(linkElement).toBeInTheDocument();
});
