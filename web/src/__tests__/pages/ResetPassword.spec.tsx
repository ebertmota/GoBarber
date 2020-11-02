import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedPost = jest.fn();
const mockedAddToast = jest.fn();
const mockReplace = jest.fn(() => 'sdfghasdjkfsdjkf');

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: {
        replace: mockReplace,
      },
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

describe('ResetPassword page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
    mockedPost.mockClear();
  });

  it('should be able to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalled();
    });
  });

  it('should not be able to reset password with invalid user token', async () => {
    mockReplace.mockImplementation(() => {
      return '';
    });

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to reset password with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordField, { target: { value: '12312323' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: 'asdfsdfsd' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedPost).not.toHaveBeenCalled();
    });
  });
});
