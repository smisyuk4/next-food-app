import { Montserrat } from 'next/font/google';

import MainHeader from '@/components/main-header/main-header';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'NextLevel food',
  description: 'Delicious meals, shared by a food-loving community',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
