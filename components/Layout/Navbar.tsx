import Link from 'next/link';
import { FC } from 'react';
import TangibleLogo from '../Logo/TangibleLogo';
//import Avatar from './Avatar';

export const Navbar: FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <TangibleLogo className="w-48 h-auto" />
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* <Avatar /> */}
      </div>
    </div>
  );
};