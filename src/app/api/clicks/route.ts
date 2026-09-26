import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/mongodb";
import { LIMITS } from "@/types/models";

// 여러 링크의 누적 클릭수를 한 번에 조회: GET /api/clicks?linkIds=a,b,c → { counts: { a: 3, b: 0, c: 12 } }
export async function GET(req: Request) {
  const linkIds = (new URL(req.url).searchParams.get("linkIds") ?? "")
    .split(",")
    .filter((id) => ObjectId.isValid(id) && id.length === 24);

  if (linkIds.length === 0 || linkIds.length > LIMITS.maxLinks) {
    return Response.json({ error: "linkIds가 올바르지 않습니다." }, { status: 400 });
  }

  const { clicks } = await getCollections();
  const rows = await clicks
    .aggregate<{ _id: ObjectId; count: number }>([
      { $match: { linkId: { $in: linkIds.map((id) => new ObjectId(id)) } } },
      { $group: { _id: "$linkId", count: { $sum: 1 } } },
    ])
    .toArray();

  const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
  for (const row of rows) counts[row._id.toHexString()] = row.count;

  return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
}
