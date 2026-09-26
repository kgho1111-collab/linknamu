import type { ObjectId } from "mongodb";

export const LIMITS = {
  displayName: 30,
  bio: 100,
  linkTitle: 50,
  maxLinks: 20,
} as const;

export interface User {
  _id: ObjectId;
  /** 고유, URL 슬러그로 사용 (/[username]) */
  username: string;
  email: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Link {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  url: string;
  iconUrl?: string;
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Click {
  _id: ObjectId;
  linkId: ObjectId;
  /** 집계 편의용 */
  userId: ObjectId;
  clickedAt: Date;
  /** 개인정보 최소 수집 원칙 하에 검토 */
  referrer?: string;
}
