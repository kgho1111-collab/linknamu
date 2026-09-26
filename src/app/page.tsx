import ProfileView, { type ProfileViewData } from "@/components/ProfileView";

// DB 연동 전까지 사용하는 샘플 프로필
const sampleProfile: ProfileViewData = {
  displayName: "김클로",
  bio: "세계 최강 바이브코더",
  links: [
    { id: "1", title: "GitHub", url: "https://github.com" },
    { id: "2", title: "기술 블로그", url: "https://velog.io" },
    { id: "3", title: "포트폴리오", url: "https://vercel.com" },
  ],
};

export default function Home() {
  return <ProfileView {...sampleProfile} />;
}
