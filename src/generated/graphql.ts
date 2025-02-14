import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Bamboo = {
  __typename?: 'Bamboo';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAnonymous: Scalars['Boolean']['output'];
  likeCount: Scalars['Int']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type BambooComment = {
  __typename?: 'BambooComment';
  bamboo: Bamboo;
  comment: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
};

export type Community = {
  __typename?: 'Community';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likeCount?: Maybe<Scalars['Int']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  modifiedBy?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  type: CommunityType;
};

export type CommunityConnection = {
  __typename?: 'CommunityConnection';
  communities: Array<Community>;
  pageInfo: PageInfo;
};

export type CommunityRequest = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: CommunityType;
};

export enum CommunityType {
  Department = 'DEPARTMENT',
  Free = 'FREE',
  Student = 'STUDENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  saveCommunity: Scalars['Boolean']['output'];
  signUp: Scalars['String']['output'];
};


export type MutationSaveCommunityArgs = {
  communityRequest: CommunityRequest;
};


export type MutationSignUpArgs = {
  signUpRequest: SignUpRequest;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllByTab: CommunityConnection;
};


export type QueryFindAllByTabArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  tab: CommunityType;
};

export enum Role {
  RoleAdmin = 'ROLE_ADMIN',
  RoleUser = 'ROLE_USER'
}

export type SignUpRequest = {
  department: Scalars['String']['input'];
  enteredYear: Scalars['Date']['input'];
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  enteredYear: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  role?: Maybe<Role>;
  username: Scalars['String']['output'];
};

export type SignUpMutationVariables = Exact<{
  signUpRequest: SignUpRequest;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: string };

export type SaveCommunityMutationVariables = Exact<{
  communityRequest: CommunityRequest;
}>;


export type SaveCommunityMutation = { __typename?: 'Mutation', saveCommunity: boolean };

export type FindAllByTabQueryVariables = Exact<{
  tab: CommunityType;
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FindAllByTabQuery = { __typename?: 'Query', findAllByTab: { __typename?: 'CommunityConnection', communities: Array<{ __typename?: 'Community', id: string, title: string, content: string, type: CommunityType, tags?: Array<string | null> | null, likeCount?: number | null, createdAt?: any | null, createdBy?: string | null, modifiedAt?: any | null, modifiedBy?: string | null }>, pageInfo: { __typename?: 'PageInfo', totalPages: number, totalElements: number, currentPage: number, size: number, hasNext: boolean, hasPrevious: boolean } } };


export const SignUpDocument = gql`
    mutation SignUp($signUpRequest: SignUpRequest!) {
  signUp(signUpRequest: $signUpRequest)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpRequest: // value for 'signUpRequest'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SaveCommunityDocument = gql`
    mutation SaveCommunity($communityRequest: CommunityRequest!) {
  saveCommunity(communityRequest: $communityRequest)
}
    `;
export type SaveCommunityMutationFn = Apollo.MutationFunction<SaveCommunityMutation, SaveCommunityMutationVariables>;

/**
 * __useSaveCommunityMutation__
 *
 * To run a mutation, you first call `useSaveCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCommunityMutation, { data, loading, error }] = useSaveCommunityMutation({
 *   variables: {
 *      communityRequest: // value for 'communityRequest'
 *   },
 * });
 */
export function useSaveCommunityMutation(baseOptions?: Apollo.MutationHookOptions<SaveCommunityMutation, SaveCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCommunityMutation, SaveCommunityMutationVariables>(SaveCommunityDocument, options);
      }
export type SaveCommunityMutationHookResult = ReturnType<typeof useSaveCommunityMutation>;
export type SaveCommunityMutationResult = Apollo.MutationResult<SaveCommunityMutation>;
export type SaveCommunityMutationOptions = Apollo.BaseMutationOptions<SaveCommunityMutation, SaveCommunityMutationVariables>;
export const FindAllByTabDocument = gql`
    query FindAllByTab($tab: CommunityType!, $page: Int = 1, $size: Int = 10) {
  findAllByTab(tab: $tab, page: $page, size: $size) {
    communities {
      id
      title
      content
      type
      tags
      likeCount
      createdAt
      createdBy
      modifiedAt
      modifiedBy
    }
    pageInfo {
      totalPages
      totalElements
      currentPage
      size
      hasNext
      hasPrevious
    }
  }
}
    `;

/**
 * __useFindAllByTabQuery__
 *
 * To run a query within a React component, call `useFindAllByTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllByTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllByTabQuery({
 *   variables: {
 *      tab: // value for 'tab'
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useFindAllByTabQuery(baseOptions: Apollo.QueryHookOptions<FindAllByTabQuery, FindAllByTabQueryVariables> & ({ variables: FindAllByTabQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllByTabQuery, FindAllByTabQueryVariables>(FindAllByTabDocument, options);
      }
export function useFindAllByTabLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllByTabQuery, FindAllByTabQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllByTabQuery, FindAllByTabQueryVariables>(FindAllByTabDocument, options);
        }
export function useFindAllByTabSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllByTabQuery, FindAllByTabQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllByTabQuery, FindAllByTabQueryVariables>(FindAllByTabDocument, options);
        }
export type FindAllByTabQueryHookResult = ReturnType<typeof useFindAllByTabQuery>;
export type FindAllByTabLazyQueryHookResult = ReturnType<typeof useFindAllByTabLazyQuery>;
export type FindAllByTabSuspenseQueryHookResult = ReturnType<typeof useFindAllByTabSuspenseQuery>;
export type FindAllByTabQueryResult = Apollo.QueryResult<FindAllByTabQuery, FindAllByTabQueryVariables>;