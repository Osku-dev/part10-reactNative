import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on ReviewConnection {
    edges {
      node {
        id
        text
        rating
        createdAt
        repository {
          id
          fullName
        }
        user {
          id
          username
        }
      }
    }
  }
`;
