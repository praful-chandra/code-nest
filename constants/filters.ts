export enum HomePageFiltersEnums {
  "newest" = "newest",
  "recommended" = "recommended",
  "frequent" = "frequent",
  "unanswered" = "unanswered",
}

export enum CommunityFiltersEnums {
  "new_users" = "new_users",
  "old_users" = "old_users",
  "top_contributors" = "top_contributors",
}

export enum TagFiltersEnums {
  "popular" = "popular",
  "recent" = "recent",
  "name" = "name",
  "old" = "old",
}

export enum AnswerFiltersEnums {
  "highestUpvotes" = "highestUpvotes",
  "lowestUpvotes" = "lowestUpvotes",
  "recent" = "recent",
  "old" = "old",
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
  { label: "Popular", value: TagFiltersEnums.popular },
  { label: "Recent", value: TagFiltersEnums.recent },
  { label: "label", value: TagFiltersEnums.name },
  { label: "Old", value: TagFiltersEnums.old },
];

export const AnswerFilters = [
  { label: "Highest Upvotes", value: AnswerFiltersEnums.highestUpvotes },
  { label: "Lowest Upvotes", value: AnswerFiltersEnums.lowestUpvotes },
  { label: "Most Recent", value: AnswerFiltersEnums.recent },
  { label: "Oldest", value: AnswerFiltersEnums.old },
];
