import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  showGitHubButton, 
  onGitHubPress
}) => {
  return (
    <View testID={`repositoryItem-${id}`} style={styles.container}>
      <View style={styles.headerContainer}>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} testID={`avatar-${id}`} />
      <View style={styles.details}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.fullName} testID={`fullName-${id}`}>
          {fullName}
        </Text>
        <Text color="textSecondary" style={styles.description} testID={`description-${id}`}>
          {description}
        </Text>
        <View style={styles.languageContainer}>
          <Text style={styles.language} testID={`language-${id}`}>
            {language}
          </Text>
          </View>
        
        <View style={styles.statsContainer}>
          <StatItem label="Stars" value={formatCount(stargazersCount)} testID={`stars-${id}`} />
          <StatItem label="Forks" value={formatCount(forksCount)} testID={`forks-${id}`} />
          <StatItem label="Reviews" value={reviewCount} testID={`reviews-${id}`} />
          <StatItem label="Rating" value={ratingAverage} testID={`rating-${id}`} />
        </View>
      </View>
      </View>
      
      
      {showGitHubButton && (
        <View style={styles.buttonWrapper}>
        <Pressable testID="gitHubButton" style={styles.button} onPress={onGitHubPress}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
      </View>
      )}
    </View>
    
  );
};

const StatItem = ({ label, value, testID }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold" style={styles.statValue} testID={`${testID}`}>
      {value}
    </Text>
    <Text color="textSecondary" style={styles.statLabel}>
      {label}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row', 
    marginBottom: 10, 
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  fullName: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  language: {
    color: 'white',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
  },
  buttonWrapper: {
    marginTop: 16,
    alignItems: 'center', 
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.appBarText,
  },
});

export default RepositoryItem;
