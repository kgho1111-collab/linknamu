import ProfileView, { type ProfileViewData } from "@/components/ProfileView";

// DB 연동 전까지 사용하는 샘플 프로필
const sampleProfile: ProfileViewData = {
  displayName: "김개발",
  bio: "풀스택 개발자 / 요즘에는 AI 개발에 관심이 많아요",
  links: [
    { id: "1", title: "깃허브", url: "https://github.com/kgho111" },
    { id: "2", title: "블로그", url: "https://blog.naver.com/kgho1111" },
    { id: "3", title: "이메일", url: "mailto:bus82@hanmail.net" },
  ],
};

export default function Home() {
  return <ProfileView {...sampleProfile} />;
}
