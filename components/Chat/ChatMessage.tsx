import { Message } from '@/types';
import { FC } from 'react';

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div
      className={`flex flex-col ${
        message.role === 'assistant' ? 'items-start' : 'items-end'
      }`}
    >
      <div
        className={`flex items-center ${
          message.role === 'assistant'
            ? 'bg-info text-info-content'
            : 'bg-accent text-accent-content'
        } rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: 'anywhere' }}
      >
        {message.content}
      </div>
    </div>
  );
};