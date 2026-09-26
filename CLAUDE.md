CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참고하는 프로젝트 가이드입니다.

프로젝트 개요

**링크나무(LinkNamu)**는 개인 창작자, 개발자, 프리랜서를 위한 "링크 인 바이오(Link in Bio)" 서비스입니다. 사용자가 자신의 여러 SNS·블로그·포트폴리오 링크를 하나의 프로필 페이지로 모아 단일 URL로 공유할 수 있게 합니다.

핵심 문제: Instagram, X(트위터) 등 SNS는 프로필에 링크를 하나만 등록할 수 있어 여러 채널을 동시에 홍보하기 어렵고, 방문자 반응(클릭)을 파악할 수단도 부족합니다.

기술 스택
영역	기술
프론트엔드/백엔드	Next.js 16 (App Router)
언어	TypeScript
스타일링	Tailwind CSS
데이터베이스	MongoDB Atlas
배포	Vercel
아키텍처
Next.js App Router 기반: 공개 프로필 페이지는 SSR/ISR, 관리자 대시보드는 CSR로 구성
API Routes(Route Handlers)로 프로필 조회, 링크 CRUD, 클릭 이벤트 수집 엔드포인트 구현
MongoDB Atlas에 사용자·링크·클릭 로그 컬렉션 저장
Vercel Edge/Serverless 함수로 API 처리, 글로벌 CDN으로 공개 페이지 빠른 로딩
인증 방식(이메일/OAuth 등)은 별도 결정 필요 — 구현 전 확인할 것
데이터 모델
User (사용자/프로필)
_id: ObjectId
username: string   // 고유, URL 슬러그로 사용 (/[username])
email: string
displayName: string
bio: string         // 최대 100자
avatarUrl: string
createdAt, updatedAt: Date
Link (링크 카드)
_id: ObjectId
userId: ObjectId    // User 참조
title: string        // 최대 50자
url: string
iconUrl?: string
order: number        // 노출 순서
isVisible: boolean
createdAt, updatedAt: Date
Click (클릭 로그)
_id: ObjectId
linkId: ObjectId     // Link 참조
userId: ObjectId     // User 참조 (집계 편의용)
clickedAt: Date
referrer?: string    // 유입 경로 분석용, 개인정보 최소 수집 원칙 검토 필요
핵심 기능
프로필: 이름(최대 30자), 한줄 소개(최대 100자, 선택), 프로필 사진(정사각형 크롭, 미등록 시 기본 아바타), 고유 URL(linknamu.app/사용자명)
링크 카드: 제목·URL·아이콘(선택), 추가/수정/삭제, 드래그 앤 드롭 순서 변경, 클릭 시 새 탭 이동, 노출/비노출 토글, MVP 최대 20개 권장
클릭수 집계: 클릭 이벤트 비동기 기록(페이지 이동 속도 영향 없도록), 관리자 대시보드에 링크별 누적 클릭수 표시, 중복 클릭 처리 정책은 별도 정의 필요
화면 구성
공개 프로필 페이지 (/[username]): 프로필 정보 + 링크 카드 목록, 모바일 우선 반응형
관리자 대시보드: 로그인 필요, 프로필 편집 / 링크 관리(추가·수정·삭제·순서·노출) / 클릭 통계 / 내 페이지 URL 복사·미리보기
성공지표 (MVP 기준)
프로필 생성 완료율 (가입 후 프로필+링크 1개 이상 등록 비율)
공개 페이지 평균 로딩 속도 (LCP 2초 이내)
클릭 이벤트 집계 누락률 1% 미만
개발 시 유의사항
공개 프로필 페이지는 성능(로딩 속도)이 최우선 — 불필요한 클라이언트 번들 최소화
클릭 이벤트 기록은 반드시 비동기/논블로킹으로 처리
개인정보(IP 등)는 최소 수집 원칙 적용, 저장 여부는 구현 전 재확인
MVP 범위 외 기능(커스텀 테마, 자동 아이콘 매칭, 커스텀 도메인, QR코드, 다국어 등)은 구현하지 않음 — 향후 확장 항목으로만 구조에 여지를 남길 것
@AGENTS.md
