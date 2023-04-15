import { Chat } from '@/components/Chat/Chat';
import { Footer } from '@/components/Layout/Footer';
import { Navbar } from '@/components/Layout/Navbar';
import { Message } from '@/types';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import {
  User,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';

export default function Recovery({ user, data }: { user: User; data: any }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const name = user?.user_metadata.name ?? 'User';

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: updatedMessages,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setMessages((messages) => [
          ...messages,
          {
            role: 'assistant',
            content: chunkValue,
          },
        ]);
      } else {
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue,
          };
          return [...messages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi ${name}! I am 4337-GPT Account Recovery support. Our purpose is to help you, the wallet owners who lost your private key recover your account.`,
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Hi ${name}! I am 4337-GPT Account Recovery customer support. Our purpose is to help you, the wallet owners who lost your private key recover your account. `,
      },
    ]);
  }, [name]);

  return (
    <>
      <Head>
        <title>Recovery UI</title>
        <meta
          name="description"
          content="Recovery UI for EIP-4337 Social Recovery for Crypto Wallets"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div data-theme="dark" className="flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSend={handleSend}
              onReset={handleReset}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Footer />
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

  // Run queries with RLS on the server
  const { data } = await supabase.from('users').select('*');

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  };
};
