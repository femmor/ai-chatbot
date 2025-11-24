import ReactMarkdown from 'react-markdown';
import type { Message } from '@/types';
import { useEffect, useRef, type ClipboardEvent } from 'react';

type ChatMessagesProp = {
   messages: Message[];
};

const ChatMessages = ({ messages }: ChatMessagesProp) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   // Handle copy event to format copied text
   const onCopyMessage = (
      e: ClipboardEvent<HTMLParagraphElement>,
      content: string
   ) => {
      e.preventDefault();
      const selection = window.getSelection()?.toString().trim() || content;
      if (selection) {
         e.clipboardData.setData('text/plain', selection);
      }
   };

   // Handle scroll to bottom on new message
   const scrollToBottom = () => {
      if (lastMessageRef.current) {
         lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   return (
      <>
         {messages.map((msg, index) => (
            <div
               key={index}
               onCopy={(e) => onCopyMessage(e, msg.content)}
               className={`px-3 py-1 rounded-xl my-2 max-w-lg ${msg.role === 'user' ? 'bg-blue-600 text-white text-right ml-auto rounded-tr-none' : 'bg-gray-100 text-black text-left mr-auto rounded-tl-none'}`}
               ref={index === messages.length - 1 ? lastMessageRef : null}
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
         ))}
      </>
   );
};
export default ChatMessages;
