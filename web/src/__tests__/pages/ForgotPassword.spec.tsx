import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../../pages/ForgotPassword';

const mockedHistoryPush = jest.fn();
const mockedPost = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../services/api', () => {
  return {
    post: () => {
      return mockedPost();
    },
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ForgotPassword page', () => {
  beforeEach(() => {
    mockedAddToast.mockClear();
    mockedPost.mockClear();
  });

  it('should be able to send reset password request', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'jhondoe@example.com' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to send reset password request with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedPost).not.toHaveBeenCalled();
    });
  });

  it('should not be able to send reset password request with non registered email', async () => {
    mockedPost.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, {
      target: { value: 'notregistered@example.com' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
