import Header from '@/components/header';
import './globals.css';

// willbe by default set as metadata in pages which doesnt have custom defined metadata
export const metadata = {
  title: 'NextPosts',
  description: 'Browse and share amazing posts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
