import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/mongodb";

// 링크 클릭 1회 기록. 클라이언트는 sendBeacon으로 호출하므로 응답 본문은 쓰지 않는다.
export async function POST(_req: Request, ctx: RouteContext<"/api/links/[id]/click">) {
  const { id } = await ctx.params;

  if (!ObjectId.isValid(id) || id.length !== 24) {
    return new Response(null, { status: 404 });
  }

  const { links, clicks } = await getCollections();
  const link = await links.findOne({ _id: new ObjectId(id), isVisible: true });
  if (!link) {
    return new Response(null, { status: 404 });
  }

  await clicks.insertOne({
    _id: new ObjectId(),
    linkId: link._id,
    userId: link.userId,
    clickedAt: new Date(),
  });

  return new Response(null, { status: 204 });
}
