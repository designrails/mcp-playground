'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Issue, Comment, User, Label, IssueStatus, IssuePriority } from '@/types';
import { getInitialData } from '@/lib/data/mock-data';

interface IssueState {
  issues: Issue[];
  comments: Comment[];
  users: User[];
  labels: Label[];
  currentUser: User;
}

type IssueAction =
  | { type: 'CREATE_ISSUE'; payload: Omit<Issue, 'id' | 'identifier' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_ISSUE'; payload: { id: string; updates: Partial<Issue> } }
  | { type: 'DELETE_ISSUE'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'SET_CURRENT_USER'; payload: User }
  | { type: 'RESET_DATA' };

interface IssueContextType {
  state: IssueState;
  createIssue: (issue: Omit<Issue, 'id' | 'identifier' | 'createdAt' | 'updatedAt'>) => Issue;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) => Comment;
  deleteComment: (id: string) => void;
  setCurrentUser: (user: User) => void;
  getIssueById: (id: string) => Issue | undefined;
  getCommentsByIssueId: (issueId: string) => Comment[];
  getUserById: (id: string) => User | undefined;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

let issueCounter = 100;

function generateIssueId(): string {
  return `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateCommentId(): string {
  return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateIdentifier(): string {
  return `ISS-${String(issueCounter++).padStart(3, '0')}`;
}

function issueReducer(state: IssueState, action: IssueAction): IssueState {
  switch (action.type) {
    case 'CREATE_ISSUE': {
      const newIssue: Issue = {
        ...action.payload,
        id: generateIssueId(),
        identifier: generateIdentifier(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        issues: [...state.issues, newIssue],
      };
    }
    case 'UPDATE_ISSUE': {
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id
            ? { ...issue, ...action.payload.updates, updatedAt: new Date() }
            : issue
        ),
      };
    }
    case 'DELETE_ISSUE': {
      return {
        ...state,
        issues: state.issues.filter((issue) => issue.id !== action.payload),
        comments: state.comments.filter((comment) => comment.issueId !== action.payload),
      };
    }
    case 'ADD_COMMENT': {
      const newComment: Comment = {
        ...action.payload,
        id: generateCommentId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        comments: [...state.comments, newComment],
      };
    }
    case 'DELETE_COMMENT': {
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),
      };
    }
    case 'SET_CURRENT_USER': {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case 'RESET_DATA': {
      const data = getInitialData();
      return {
        ...state,
        issues: data.issues,
        comments: data.comments,
      };
    }
    default:
      return state;
  }
}

export function IssueProvider({ children }: { children: ReactNode }) {
  const data = getInitialData();
  const [state, dispatch] = useReducer(issueReducer, {
    issues: data.issues,
    comments: data.comments,
    users: data.users,
    labels: data.labels,
    currentUser: data.users[0], // Default to first user
  });

  const createIssue = (issue: Omit<Issue, 'id' | 'identifier' | 'createdAt' | 'updatedAt'>): Issue => {
    const newIssue: Issue = {
      ...issue,
      id: generateIssueId(),
      identifier: generateIdentifier(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'CREATE_ISSUE', payload: issue });
    return newIssue;
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    dispatch({ type: 'UPDATE_ISSUE', payload: { id, updates } });
  };

  const deleteIssue = (id: string) => {
    dispatch({ type: 'DELETE_ISSUE', payload: id });
  };

  const addComment = (comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Comment => {
    const newComment: Comment = {
      ...comment,
      id: generateCommentId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_COMMENT', payload: comment });
    return newComment;
  };

  const deleteComment = (id: string) => {
    dispatch({ type: 'DELETE_COMMENT', payload: id });
  };

  const setCurrentUser = (user: User) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  };

  const getIssueById = (id: string): Issue | undefined => {
    return state.issues.find((issue) => issue.id === id);
  };

  const getCommentsByIssueId = (issueId: string): Comment[] => {
    return state.comments.filter((comment) => comment.issueId === issueId);
  };

  const getUserById = (id: string): User | undefined => {
    return state.users.find((user) => user.id === id);
  };

  return (
    <IssueContext.Provider
      value={{
        state,
        createIssue,
        updateIssue,
        deleteIssue,
        addComment,
        deleteComment,
        setCurrentUser,
        getIssueById,
        getCommentsByIssueId,
        getUserById,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
}
