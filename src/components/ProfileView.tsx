import LinkList from "./LinkList";

export interface ProfileViewData {
  displayName: string;
  bio?: string;
  links: { id: string; title: string; url: string }[];
}

// 공개 프로필 화면 (wireframe.png 기준). 서버 컴포넌트로 유지하고, 클릭수가 필요한 링크 목록(LinkList)만 클라이언트 컴포넌트로 분리한다.
export default function ProfileView({ displayName, bio, links }: ProfileViewData) {
  return (
    <main className="relative isolate flex flex-1 justify-center overflow-hidden bg-gradient-to-b from-[#fffaf2] via-[#fff0e3] to-[#ffdcc8] px-6 py-16 sm:py-24 dark:from-[#1a1512] dark:via-[#211915] dark:to-[#2e1f18]">
      {/* 글래스 카드 뒤로 은은하게 비치는 배경 빛 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 size-[28rem] -translate-x-[70%] rounded-full bg-[#ffd9b8]/60 blur-3xl dark:bg-[#7a4a32]/25" />
        <div className="absolute top-1/2 right-1/2 size-[24rem] translate-x-[85%] rounded-full bg-[#ffc6b0]/50 blur-3xl dark:bg-[#6b3a2c]/25" />
      </div>

      <div className="flex w-full max-w-md flex-col items-center">
        {/* 원형 프로필 사진 (미등록 시 기본 아바타) */}
        <div
          aria-hidden
          className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-[#ffc9a3] to-[#f39a78] text-4xl font-semibold text-white shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),inset_0_-6px_12px_rgba(180,80,40,0.18),0_12px_28px_-8px_rgba(200,110,70,0.45)] ring-4 ring-white/80 dark:ring-white/10"
        >
          {displayName.charAt(0)}
        </div>

        <h1 className="mt-7 text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100">{displayName}</h1>
        {bio && (
          <p className="mt-2.5 max-w-xs text-center text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
            {bio}
          </p>
        )}

        <LinkList links={links} />
      </div>
    </main>
  );
}
