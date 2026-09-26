import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/mongodb";
import { SAMPLE_USER_ID, sampleProfile } from "@/lib/sample-profile";

// 링크 클릭 1회 기록. 클라이언트는 sendBeacon으로 호출하므로 응답 본문은 쓰지 않는다.
export async function POST(_req: Request, ctx: RouteContext<"/api/links/[id]/click">) {
  const { id } = await ctx.params;

  // 존재하는 링크만 기록 (DB 연동 후에는 links 컬렉션 조회로 대체)
  if (!sampleProfile.links.some((link) => link.id === id)) {
    return new Response(null, { status: 404 });
  }

  const { clicks } = await getCollections();
  await clicks.insertOne({
    _id: new ObjectId(),
    linkId: new ObjectId(id),
    userId: new ObjectId(SAMPLE_USER_ID),
    clickedAt: new Date(),
  });

  return new Response(null, { status: 204 });
}
