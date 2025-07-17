# 🧩 JsTable

React 기반의 커스터마이징 가능한 테이블 컴포넌트입니다. 다음과 같은 기능을 제공합니다:

- ✅ 컬럼 숨김/표시 설정
- 🔁 컬럼 순서 변경 (드래그)
- 📏 컬럼 너비 조절 (리사이즈)
- ☑️ 체크박스 행 선택
- 🎨 테마 및 배경 지정
- 📄 헤더 렌더링 커스터마이징
- 📚 페이징 지원

---

## 🚀 설치

```bash
npm install @bavuchoko/js-table
```


---

## ✨ 사용 예시

```tsx
import { JsTable } from '@bavuchoko/js-table';

const headerList = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Status',
    renderer: (row) => <span>{row.status === 'active' ? '🟢 Active' : '🔴 Inactive'}</span>
  }
];

const dataList = [
  { id: 1, name: 'Alice', email: 'alice@example.com', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', status: 'inactive' },
  // ...
];

...

<div style={{width:'1000px', height:'300px'}}>
    <JsTable
      header={headerList}
      data={dataList}
      setting={{
        hidden: ['email'],
        order: ['id', 'name', 'email', 'status']
      }}
      page={{ currentPage: 0, size: 10, totalElements: 100 }}
      usePagination="bottom"
      useSetting={true}
      background="light"
      theme="dark"
      resizable={true}
      draggable={true}
      onHeaderMove={(newOrder) => console.log('New order:', newOrder)}
      onResizeWidth={(widths) => console.log('Widths:', widths)}
      onRowClick={(id) => console.log('Clicked row ID:', id)}
      onPageChange={(page) => console.log('Changed to page:', page)}
    />
</div>

...



---

## 🧾 Props

| Prop             | Type                                                            | Description |
|------------------|------------------------------------------------------------------|-------------|
| `header`         | `Array<{ key: string; label: string; renderer?: (row) => JSX }>` | 테이블 컬럼 정의 |
| `data`           | `any[]`                                                          | 렌더링할 데이터 배열 |
| `setting`        | `{ hidden?: string[]; order?: string[] }`                        | 초기 숨김 컬럼, 순서 설정 |
| `page`           | `{ currentPage: number; size: number; totalElements: number }`   | 페이징 정보 |
| `usePagination`  | `'top' \| 'bottom' \| boolean`                                   | 페이징 위치 또는 사용 여부 |
| `useSetting`     | `boolean`                                                        | 컬럼 설정 팝업 사용 여부 |
| `background`     | `'light' \| 'dark' \| string`                                    | 테이블 배경색 또는 클래스 |
| `theme`          | `'light' \| 'dark'`                                              | 테이블 테마 스타일 |
| `style`          | `{ header?: CSSProperties; body?: CSSProperties }`               | 사용자 정의 스타일 |
| `resizable`      | `boolean`                                                        | 컬럼 너비 조절 가능 여부 |
| `draggable`      | `boolean`                                                        | 컬럼 순서 드래그 가능 여부 |
| `onHeaderMove`   | `(order: string[]) => void`                                      | 컬럼 순서 변경 콜백 |
| `onResizeWidth`  | `(widths: number[]) => void`                                     | 컬럼 리사이즈 콜백 |
| `onRowClick`     | `(id: any) => void`                                              | 행 클릭 콜백 |
| `onPageChange`   | `(page: number) => void`                                         | 페이지 변경 콜백 |

---

## ⚙️ 내부 Hook 구성

| Hook                | 역할 설명 |
|---------------------|-----------|
| `useDataHandler`    | 체크박스 및 row 데이터 핸들링 |
| `useHeaderHandler`  | 컬럼 순서 및 숨김 처리 |
| `useColumnWidths`   | 컬럼 리사이즈 로직 처리 |
| `useDragHandler`    | 드래그 기반 컬럼 순서 변경 |
| `useSettingPop`     | 설정 팝업 상태 관리 |
| `useCustomStyle`    | 테마/배경 스타일 반환 |
| `useHiddenHeader`   | 숨김 컬럼 상태 및 토글 제어 |

---

## 📁 파일 구조

```plaintext
JsTable/
├── JsTable.tsx                # 메인 테이블 컴포넌트
├── hook/
│   ├── useDataHandler.ts
│   ├── useHeaderHandler.ts
│   ├── useColumnWidths.ts
│   ├── useDragHandler.ts
│   ├── useSettingPop.ts
│   ├── useCustomStyle.ts
│   └── useHiddenHeader.ts
└── utils/
    ├── Pagination.tsx
    ├── SettingPop.tsx
    ├── Blind.tsx
    └── Empty.tsx
