import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

test('renders LoginPage without crashing', () => {
  render(<App />);
});
