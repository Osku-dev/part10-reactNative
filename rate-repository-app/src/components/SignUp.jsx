import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const SignUpContainer = ({
  onSubmit,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Sign Up</Text>

    <TextInput
      style={[
        styles.input,
        touched.username && errors.username && styles.errorInput,
      ]}
      placeholder="Username"
      value={values.username}
      onChangeText={handleChange("username")}
      onBlur={handleBlur("username")}
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
      onChangeText={handleChange("password")}
      onBlur={handleBlur("password")}
    />
    {touched.password && errors.password && (
      <Text style={styles.errorText}>{errors.password}</Text>
    )}

    <TextInput
      style={[
        styles.input,
        touched.confirmPassword && errors.confirmPassword && styles.errorInput,
      ]}
      placeholder="Confirm Password"
      secureTextEntry
      value={values.confirmPassword}
      onChangeText={handleChange("confirmPassword")}
      onBlur={handleBlur("confirmPassword")}
    />
    {touched.confirmPassword && errors.confirmPassword && (
      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
    )}

    <Pressable testID="signUpButton" style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </Pressable>
  </View>
);

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signUp({ username: values.username, password: values.password });
        await signIn({ username: values.username, password: values.password });
        navigate("/");
      } catch (error) {
        console.error("Sign-up failed:", error.message);
      }
    },
  });

  return (
    <SignUpContainer
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
    backgroundColor: "#fff",
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
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: theme.fontSizes.body,
    marginBottom: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.appBarText,
  },
});

export default SignUp;
