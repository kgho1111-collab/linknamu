export interface ProfileViewData {
  displayName: string;
  bio?: string;
  links: { id: string; title: string; url: string }[];
}

// 공개 프로필 화면 (wireframe.png 기준). 서버 컴포넌트로 유지해 클라이언트 번들을 만들지 않는다.
export default function ProfileView({ displayName, bio, links }: ProfileViewData) {
  return (
    <main className="flex flex-1 justify-center bg-zinc-100 px-4 py-10 dark:bg-zinc-950">
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* 원형 프로필 사진 (미등록 시 기본 아바타) */}
        <div
          aria-hidden
          className="flex size-32 items-center justify-center rounded-full bg-emerald-100 text-5xl font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
        >
          {displayName.charAt(0)}
        </div>

        <h1 className="mt-6 text-2xl font-bold">{displayName}</h1>
        {bio && <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">{bio}</p>}

        <ul className="mt-8 flex w-full flex-col gap-3">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-zinc-300 px-5 py-4 text-center font-medium transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-zinc-700 dark:hover:bg-emerald-950/40"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
