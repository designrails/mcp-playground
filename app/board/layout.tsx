import { AppLayout } from '@/components/app-layout';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
