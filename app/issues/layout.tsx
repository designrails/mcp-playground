import { AppLayout } from '@/components/app-layout';

export default function IssuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
