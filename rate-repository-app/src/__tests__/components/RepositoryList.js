import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      expect(screen.getByTestId('repositoryItem-jaredpalmer.formik')).toBeDefined();
      expect(screen.getByTestId('avatar-jaredpalmer.formik')).toBeDefined();
      expect(screen.getByTestId('fullName-jaredpalmer.formik')).toHaveTextContent('jaredpalmer/formik');
      expect(screen.getByTestId('description-jaredpalmer.formik')).toHaveTextContent('Build forms in React, without the tears');
      expect(screen.getByTestId('language-jaredpalmer.formik')).toHaveTextContent('TypeScript');
      expect(screen.getByTestId('stars-jaredpalmer.formik')).toHaveTextContent('21.9k');
      expect(screen.getByTestId('forks-jaredpalmer.formik')).toHaveTextContent('1.6k');
      expect(screen.getByTestId('reviews-jaredpalmer.formik')).toHaveTextContent('3');
      expect(screen.getByTestId('rating-jaredpalmer.formik')).toHaveTextContent('88');

      expect(screen.getByTestId('repositoryItem-async-library.react-async')).toBeDefined();
      expect(screen.getByTestId('avatar-async-library.react-async')).toBeDefined();
      expect(screen.getByTestId('fullName-async-library.react-async')).toHaveTextContent('async-library/react-async');
      expect(screen.getByTestId('description-async-library.react-async')).toHaveTextContent('Flexible promise-based React data loader');
      expect(screen.getByTestId('language-async-library.react-async')).toHaveTextContent('JavaScript');
      expect(screen.getByTestId('stars-async-library.react-async')).toHaveTextContent('1.8k');
      expect(screen.getByTestId('forks-async-library.react-async')).toHaveTextContent('69');
      expect(screen.getByTestId('reviews-async-library.react-async')).toHaveTextContent('3');
      expect(screen.getByTestId('rating-async-library.react-async')).toHaveTextContent('72');
    });
  });
});