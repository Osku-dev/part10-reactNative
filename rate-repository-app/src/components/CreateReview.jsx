import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be 100 or less'),
  review: yup.string().optional(),
});

export const CreateReviewContainer = ({
  onSubmit,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Create a Review</Text>

    <TextInput
      style={[
        styles.input,
        touched.ownerName && errors.ownerName && styles.errorInput,
      ]}
      placeholder="Repository owner name"
      value={values.ownerName}
      onChangeText={handleChange('ownerName')}
      onBlur={handleBlur('ownerName')}
    />
    {touched.ownerName && errors.ownerName && (
      <Text style={styles.errorText}>{errors.ownerName}</Text>
    )}

    <TextInput
      style={[
        styles.input,
        touched.repositoryName && errors.repositoryName && styles.errorInput,
      ]}
      placeholder="Repository name"
      value={values.repositoryName}
      onChangeText={handleChange('repositoryName')}
      onBlur={handleBlur('repositoryName')}
    />
    {touched.repositoryName && errors.repositoryName && (
      <Text style={styles.errorText}>{errors.repositoryName}</Text>
    )}

    <TextInput
      style={[
        styles.input,
        touched.rating && errors.rating && styles.errorInput,
      ]}
      placeholder="Rating (0-100)"
      keyboardType="numeric"
      value={values.rating}
      onChangeText={handleChange('rating')}
      onBlur={handleBlur('rating')}
    />
    {touched.rating && errors.rating && (
      <Text style={styles.errorText}>{errors.rating}</Text>
    )}

    <TextInput
      style={[styles.input, touched.review && errors.review && styles.errorInput]}
      placeholder="Review (optional)"
      multiline
      value={values.review}
      onChangeText={handleChange('review')}
      onBlur={handleBlur('review')}
    />
    {touched.review && errors.review && (
      <Text style={styles.errorText}>{errors.review}</Text>
    )}

    <Pressable testID="createReviewButton" style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Create Review</Text>
    </Pressable>
  </View>
);

const CreateReview = () => {
    const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      review: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const review = await createReview(values);
        navigate(`/repository/${review.repositoryId}`);
      } catch (error) {
        console.error('Failed to create review:', error.message);
      }
    },
  });

  return (
    <CreateReviewContainer
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

export default CreateReview;
