import { Navbar } from '@/components/Layout/Navbar';
import SecretQuestionForm from '@/components/SecretQuestionForm';
import {
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Setting({ user }: { user: User }) {
  const [hasSecretQuestions, setHasSecretQuestions] = useState(false);
  const [infoLoaded, setInfoLoaded] = useState(false);

  // check if user has secret questions
  useEffect(() => {
    const checkSecretQuestions = async () => {
      const fetcher = fetch('/api/has-secret-questions');
      toast
        .promise(fetcher, {
          loading: 'Loading...',
          success: (res) => {
            res
              .json()
              .then((data) => setHasSecretQuestions(data.hasSecretQuestions));
            return 'Data loaded';
          },
          error: (err) => {
            return `Error: ${err.message}`;
          },
        })
        .then(() => setInfoLoaded(true));

      // const { hasSecretQuestions } = await response.json();
      // if (hasSecretQuestions) {
      //   setHasSecretQuestions(true);
      // }
      // setInfoLoaded(true);
    };

    checkSecretQuestions();
  }, []);

  return (
    <>
      <Head>
        <title>Setting</title>
        <meta name="description" content="Setting wallet guardiant Q and A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Toaster />
        {!infoLoaded ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        ) : hasSecretQuestions ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold">
              You already set secret questions
            </h1>
          </div>
        ) : (
          <SecretQuestionForm setHasSecretQuestions={setHasSecretQuestions} />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};