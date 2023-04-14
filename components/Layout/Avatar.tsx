import Image from 'next/image';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Avatar() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState<
    | {
        [x: string]: any;
      }[]
    | null
  >();

  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from('test').select('*');
  //     setData(data);
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData();
  // }, [user, supabaseClient]);

  async function signInWithGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  if (!user) {
    return (
      <div>
        <button className="btn btn-primary" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full border-2 border-accent">
          <Image
            alt="user profile picture"
            width={40}
            height={40}
            src={user?.user_metadata.avatar_url ?? '/avatar.svg'}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
      >
        <li>
          <Link href="/app/wallet" className="justify-between">
            Wallet
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li>
          <Link href="/app/setting" className="justify-between">
            Setting
          </Link>
        </li>
        <li>
          <Link href="/app/recovery" className="justify-between">
            Recovery
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              supabaseClient.auth.signOut();
              router.push('/');
            }}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}