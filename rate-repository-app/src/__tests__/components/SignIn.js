import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
import { Formik } from 'formik';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmitMock = jest.fn();

      render(
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={onSubmitMock}
        >
          {({ handleChange, handleSubmit }) => (
            <SignInContainer
              handleChange={handleChange}
              onSubmit={handleSubmit}
              values={{ username: '', password: '' }}
              handleBlur={() => {}}
              touched={{}}
              errors={{}}
            />
          )}
        </Formik>
      );

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');
      fireEvent.press(screen.getByTestId('signInButton'));

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock.mock.calls[0][0]).toEqual({
          username: 'testuser',
          password: 'password123',
        });
      });
    });
  });
});
