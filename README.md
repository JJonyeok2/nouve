# Nouve

**Premium Unisex Fashion Commerce**

Nouve는 프리미엄 유니섹스 미니멀웨어를 주제로 만든 프론트엔드 포트폴리오 프로젝트입니다. 백엔드 없이 mock data와 client-side service를 API 경계처럼 구성해, 실제 패션 이커머스 플랫폼에서 기대되는 상품 탐색, 장바구니, 위시리스트, mock checkout, 관리자 운영 화면을 한 프로젝트 안에서 보여줍니다.

## 프로젝트 개요

이 프로젝트는 단순한 상품 카드 나열보다 “실제 커머스 서비스를 사용할 때의 흐름”을 중심으로 설계했습니다. 고객은 홈 화면에서 브랜드 무드를 확인하고, 상품 목록에서 조건에 맞는 아이템을 탐색한 뒤, 상세 페이지에서 옵션을 선택하고 장바구니나 위시리스트에 담을 수 있습니다. 관리자는 매출/주문/재고 현황을 빠르게 확인하고, 상품 노출 상태와 주문 상태를 조정할 수 있습니다.

- 도메인: 패션 이커머스 플랫폼
- 콘셉트: 프리미엄 유니섹스 미니멀웨어
- 구현 범위: frontend-only portfolio app
- 메인 컬러: `#064E52`
- 데이터 방식: mock data + async service layer
- 이미지 방식: 로컬 이미지 에셋 사용

## 기획 방향

Nouve는 “차분한 프리미엄”을 핵심 무드로 잡았습니다. 고객 화면은 넓은 여백, 큰 이미지, 절제된 컬러, 낮은 장식성을 바탕으로 상품과 브랜드 톤이 먼저 보이도록 구성했습니다. 큰 헤드라인과 설명 본문은 한국어로 작성해 사용자가 자연스럽게 읽을 수 있게 했고, 작은 eyebrow, 필터 라벨, 관리자 테이블 라벨처럼 기능적이거나 브랜드 무드에 맞는 짧은 텍스트는 영어를 유지했습니다.

관리자 화면은 반복 업무에 적합하도록 테이블, 상태 배지, 토글, 간단한 지표 카드 중심으로 구성했습니다. 포트폴리오 관점에서는 고객용 UI/UX와 운영자용 UI를 모두 보여주는 균형형 커머스 프로젝트를 목표로 했습니다.

## 사용자 흐름

1. 홈에서 브랜드 콘셉트와 신상품, 시즌 컬렉션을 확인합니다.
2. 상품 목록에서 카테고리, 사이즈, 소재, 재고 상태로 필터링하고 정렬합니다.
3. 상품 상세에서 이미지, 가격, 설명, 사이즈별 재고, 소재와 관리 정보를 확인합니다.
4. 색상과 사이즈를 선택해 장바구니에 담거나 위시리스트에 저장합니다.
5. 장바구니에서 수량, 배송비, 쿠폰 할인, 총 결제 금액을 확인합니다.
6. mock checkout에서 배송 정보와 결제 수단을 입력하고 주문 완료 화면으로 이동합니다.
7. 관리자 화면에서 매출 추이, 최근 주문, 상품 노출 상태, 주문 상태, 재고 현황을 관리합니다.

## 핵심 기능

- 고객 홈: 히어로 이미지, 신상품 섹션, 시즌 컬렉션
- 상품 탐색: URL 기반 필터, 정렬, 재고 상태 표시, 모바일 필터 drawer, 반응형 상품 그리드
- 상품 상세: 옵션 선택, 사이즈별 재고 확인, 장바구니 추가, 위시리스트 저장
- 장바구니: 수량 변경, 상품 삭제, 배송비/쿠폰/합계 계산
- 결제 흐름: React Hook Form과 Zod 기반 mock checkout validation
- 주문 완료: 로컬 주문 요약 생성 및 완료 화면
- 관리자 대시보드: 매출 추이 차트, 주문/상품/재고 지표
- 관리자 운영: 상품 노출 토글, 주문 상태 변경, 사이즈별 재고 확인
- 로컬 상태 관리: cart와 wishlist persistence
- 이미지 에셋: `public/assets/nouve/`에 로컬 저장

## 모바일 반응형

모바일에서는 상품 탐색과 결제 흐름이 끊기지 않도록 레이아웃을 단일 컬럼 중심으로 재배치했습니다. 상품 목록은 필터를 drawer로 분리해 첫 화면을 가볍게 만들고, 정렬 컨트롤과 상품 카드는 화면 폭에 맞춰 자연스럽게 쌓입니다. 장바구니와 checkout 화면은 요약 영역이 아래로 이동해 입력 폼을 먼저 처리할 수 있게 했습니다.

데스크톱에서는 넓은 상품 그리드, sticky 성격의 상세 옵션 영역, 관리자 테이블과 차트 중심의 운영 화면을 통해 반복 확인과 비교가 쉽도록 설계했습니다.

## Tech Stack

| 영역 | 기술 | 사용 목적 |
| --- | --- | --- |
| Framework | React, TypeScript, Vite | 빠른 개발 환경과 타입 안정성 |
| Routing | React Router | 고객 화면과 관리자 화면 라우팅, route-level lazy loading |
| Server State | TanStack Query | mock service의 loading/cache 흐름 |
| Client State | Zustand | cart, wishlist 로컬 상태와 persistence |
| Form | React Hook Form, Zod | checkout 입력 관리와 validation |
| Styling | Tailwind CSS | 토큰 기반 UI 스타일링과 반응형 레이아웃 |
| Chart | Recharts | 관리자 매출 추이 시각화 |
| Icons | lucide-react | 버튼과 운영 UI 아이콘 |
| Test | Vitest, Testing Library | 사용자 흐름과 상태 변경 검증 |

## Mock Architecture

```text
src/data              # products, orders, collections
src/services          # async mock commerce service
src/stores            # persisted cart/wishlist stores
src/app/router        # FSD-lite route boundaries and lazy page chunks
src/features/products # discovery, collection, product detail
src/features/cart     # cart page and totals
src/features/checkout # checkout form and order complete
src/features/admin    # dashboard, products, orders, inventory
public/assets/nouve   # local image assets
```

## 실행 방법

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

개발 서버 실행 후 기본 주소는 `http://localhost:5173`입니다.

## 검증 범위

자동화 테스트는 상품 필터링, mock service 업데이트, 라우팅, 장바구니와 위시리스트 store, 상품 상세 옵션 선택, 장바구니 합계 계산, checkout validation/submission, 관리자 상품 노출 변경, 주문 상태 변경, 로컬 이미지 경로 무결성을 포함합니다.

## 개발 워크플로우

- 구현 변경이 포트폴리오 설명, 실행 방법, 스크린샷, 주요 흐름에 영향을 주면 README를 함께 업데이트합니다.
- 기능 단위로 atomic commit을 작성합니다.
- push 전에는 `npm test`, `npm run lint`, `npm run build`로 검증합니다.

## 실제 화면

### Home

![Nouve home](docs/screenshots/nouve-home-desktop.png)

### Products Mobile

![Nouve products mobile](docs/screenshots/nouve-products-mobile.png)

### Admin Dashboard

![Nouve admin dashboard](docs/screenshots/nouve-admin-dashboard.png)
