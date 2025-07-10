import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/(home)/page';
import 'jest-canvas-mock';

describe('Page', () => {
  it('renders a heading', async () => {
    const jsx = await Page();
    render(jsx);

    const text = screen.getByText(/currently coding/i);

    expect(text).toBeInTheDocument();
  });
});
