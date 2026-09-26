import type { ProfileViewData } from "@/components/ProfileView";

// DB 연동 전까지 사용하는 샘플 프로필.
// 클릭 로그(Click)가 실제 데이터 모델과 맞도록 id는 고정 ObjectId(24자리 hex)를 사용한다.
export const SAMPLE_USER_ID = "6ab7319e03661b511f3c0de3";

export const sampleProfile: ProfileViewData = {
  displayName: "김개발",
  bio: "풀스택 개발자 / 요즘에는 AI 개발에 관심이 많아요",
  links: [
    { id: "6ab7319e03661b511f3c0de4", title: "깃허브", url: "https://github.com/kgho111" },
    { id: "6ab7319e03661b511f3c0de5", title: "블로그", url: "https://blog.naver.com/kgho1111" },
    { id: "6ab7319e03661b511f3c0de6", title: "이메일", url: "mailto:bus82@hanmail.net" },
  ],
};
