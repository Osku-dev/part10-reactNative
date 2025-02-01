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
    totalCount
    edges {
      cursor
      node {
        id
        text
        rating
        createdAt
        repositoryId
        user {
          id
          username
        }
      }
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
`;

