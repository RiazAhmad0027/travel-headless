import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Travel Blog',
  description: 'Travel tips from a WordPress backend, shown with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">Travel Blog</Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}