"use client";

import { useEffect, useState } from "react";
import type { ProfileViewData } from "./ProfileView";

type Links = ProfileViewData["links"];

// 클릭 기록은 페이지 이동을 막지 않도록 sendBeacon으로 보낸다 (미지원 시 keepalive fetch).
function recordClick(linkId: string) {
  const url = `/api/links/${linkId}/click`;
  if (!navigator.sendBeacon?.(url)) {
    fetch(url, { method: "POST", keepalive: true }).catch(() => {});
  }
}

export default function LinkList({ links }: { links: Links }) {
  // 서버 값을 받기 전에는 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();
    const ids = links.map((link) => link.id).join(",");
    fetch(`/api/clicks?linkIds=${ids}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts: Record<string, number> } | null) => {
        // 응답 전에 이미 누른 클릭(+1)은 유지되도록 기존 값과 합친다
        if (data) setCounts((prev) => mergeCounts(data.counts, prev));
      })
      .catch(() => {});
    return () => controller.abort();
  }, [links]);

  function handleClick(linkId: string) {
    recordClick(linkId);
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-12 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.id)}
            className="relative block rounded-2xl border border-white/70 bg-white/45 px-16 py-[1.125rem] text-center text-[15px] font-semibold text-stone-700 shadow-[0_1px_2px_rgba(120,70,40,0.06),0_10px_30px_-14px_rgba(160,90,50,0.35)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_1px_2px_rgba(120,70,40,0.06),0_14px_34px_-14px_rgba(160,90,50,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f39a78] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
          >
            {link.title}
            <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-medium text-stone-400 tabular-nums dark:text-stone-500">
              {(counts[link.id] ?? 0).toLocaleString("ko-KR")}회
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// 서버 누적값 + (응답 전 로컬에서 더한 클릭 수)
function mergeCounts(server: Record<string, number>, local: Record<string, number>) {
  const merged = { ...server };
  for (const [id, n] of Object.entries(local)) merged[id] = (merged[id] ?? 0) + n;
  return merged;
}
