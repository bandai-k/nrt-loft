// src/components/ui/SubPageLayout.tsx
type Props = {
  children: React.ReactNode;
};

export default function SubPageLayout({ children }: Props) {
  return (
    <div style={{ paddingTop: "var(--header-height)" }}>{children}</div>
  );
}
