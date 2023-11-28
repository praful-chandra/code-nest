export interface TagType {
  _id: string;
  __v: number;
  createdAt: string;
  followers: string[]; // these are user IDs who follow this tag
  name: string;
  questions: string[]; // these are question IDs associated with this tag
}

export interface AuthorType {
  _id: string;
  clerkId: string;
  name: string;
  userName: string;
  email: string;
  bio: string;
  avatar: string;
  location: string;
  portfolioWebsite: string;
  reputation: number;
  joinedDate: string;
  questions: string[]; // these are question IDs asked by the author
  saved: string[]; // these are question IDs saved by the author
}

export interface AnswerType {
  // Define the properties of an answer if needed
}

export interface QuestionType {
  _id: string;
  title: string;
  content: string;
  tags: TagType[];
  views: number;
  upVotes: string[]; // these are user IDs who upvoted
  downVotes: string[]; // these are user IDs who downvoted
  author: AuthorType;
  answers: AnswerType[];
  __v: number;
  createdAt: Date;
}
