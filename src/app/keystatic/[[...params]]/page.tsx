// src/app/keystatic/[[...params]]/page.tsx
import Keystatic from "../keystatic";

// 管理画面は検索結果に出さない
export const metadata = {
  title: "記事の管理",
  robots: { index: false, follow: false },
};

export default function KeystaticPage() {
  return <Keystatic />;
}
