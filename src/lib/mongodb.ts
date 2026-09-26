import { MongoClient, type Db } from "mongodb";
import type { Click, Link, User } from "@/types/models";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드 HMR 및 서버리스 재사용 시 연결이 중복 생성되지 않도록 전역에 캐시
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경변수가 설정되지 않았습니다. .env.example을 참고하세요.");
  }
  globalForMongo._mongoClientPromise ??= new MongoClient(uri).connect();
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function getCollections() {
  const db = await getDb();
  return {
    users: db.collection<User>("users"),
    links: db.collection<Link>("links"),
    clicks: db.collection<Click>("clicks"),
  };
}
