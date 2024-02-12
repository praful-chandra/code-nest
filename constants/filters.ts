export enum HomePageFiltersEnums {
  "newest" = "newest",
  "recommended" = "recommended",
  "frequent" = "frequent",
  "unanswered" = "unanswered",
}

export const homePageFilters = [
  { label: "Newest", value: HomePageFiltersEnums.newest },
  { label: "Recommended", value: HomePageFiltersEnums.recommended },
  { label: "Frequent", value: HomePageFiltersEnums.frequent },
  { label: "Unanswered", value: HomePageFiltersEnums.unanswered },
];

export const communityFilters = [
  { label: "New Users", value: "new_users" },
  { label: "Old Users", value: "old_users" },
  { label: "Top Contributors", value: "top_contributors" },
];

export const tagFilters = [
  { label: "Popular", value: "popular" },
  { label: "Recent", value: "recent" },
  { label: "label", value: "name" },
  { label: "Old", value: "old" },
];

export const AnswerFilters = [
  { label: "Highest Upvotes", value: "highestUpvotes" },
  { label: "Lowest Upvotes", value: "lowestUpvotes" },
  { label: "Most Recent", value: "recent" },
  { label: "Oldest", value: "old" },
];
