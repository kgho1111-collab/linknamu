// 샘플 프로필(src/lib/sample-profile.ts)과 동일한 데이터로 users/links 컬렉션을 채운다.
// 사용법: npm run seed
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const env = {};
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([A-Z_]+)=(.*)$/);
      if (match) env[match[1]] = match[2].replace(/^"|"$/g, "");
    }
  }
  return env;
}

const env = loadEnvLocal();
const uri = process.env.MONGODB_URI ?? env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? env.MONGODB_DB ?? "linknamu";

const SAMPLE_USER_ID = "6ab7319e03661b511f3c0de3";

const sampleLinks = [
  { id: "6ab7319e03661b511f3c0de4", title: "깃허브", url: "https://github.com/kgho111" },
  { id: "6ab7319e03661b511f3c0de5", title: "블로그", url: "https://blog.naver.com/kgho1111" },
  { id: "6ab7319e03661b511f3c0de6", title: "이메일", url: "mailto:bus82@hanmail.net" },
];

async function main() {
  if (!uri) throw new Error("MONGODB_URI 환경변수가 설정되지 않았습니다.");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const now = new Date();

  await db.collection("users").updateOne(
    { _id: new ObjectId(SAMPLE_USER_ID) },
    {
      $set: {
        username: "kgho111",
        email: "kgho1111@gmail.com",
        displayName: "김개발",
        bio: "풀스택 개발자 / 요즘에는 AI 개발에 관심이 많아요",
        avatarUrl: "",
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  for (const [index, link] of sampleLinks.entries()) {
    await db.collection("links").updateOne(
      { _id: new ObjectId(link.id) },
      {
        $set: {
          userId: new ObjectId(SAMPLE_USER_ID),
          title: link.title,
          url: link.url,
          order: index,
          isVisible: true,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );
  }

  console.log(`시드 완료: users 1건, links ${sampleLinks.length}건`);
  await client.close();
}

main().catch((err) => {
  console.error("시드 실패:", err.message);
  process.exit(1);
});
