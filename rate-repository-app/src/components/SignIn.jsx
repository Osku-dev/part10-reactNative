import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native'
import * as yup from 'yup';
import theme from '../theme';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({
  onSubmit,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Sign In</Text>

    <TextInput
      style={[
        styles.input,
        touched.username && errors.username && styles.errorInput,
      ]}
      placeholder="Username"
      value={values.username}
      onChangeText={handleChange('username')}
      onBlur={handleBlur('username')}
    />
    {touched.username && errors.username && (
      <Text style={styles.errorText}>{errors.username}</Text>
    )}

    <TextInput
      style={[
        styles.input,
        touched.password && errors.password && styles.errorInput,
      ]}
      placeholder="Password"
      secureTextEntry
      value={values.password}
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
    />
    {touched.password && errors.password && (
      <Text style={styles.errorText}>{errors.password}</Text>
    )}

    <Pressable testID="signInButton" style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Sign In</Text>
    </Pressable>
  </View>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values);
        navigate('/');
      } catch (error) {
        console.error('Sign-in failed:', error.message);
      }
    },
  });

  return (
    <SignInContainer
      onSubmit={formik.handleSubmit}
      values={formik.values}
      handleChange={formik.handleChange}
      handleBlur={formik.handleBlur}
      touched={formik.touched}
      errors={formik.errors}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 16,
    color: theme.colors.textPrimary,
  },
  input: {
    height: 40,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: theme.fontSizes.body,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: theme.fontSizes.body,
    marginBottom: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.appBarText,
  },
});

export default SignIn;