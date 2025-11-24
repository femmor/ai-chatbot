import { useMemo, useState } from 'react';
import axios from 'axios';
import type { ChatFormData, ChatResponse, Message } from '@/types';
import TypingIndicator from './TypingIndicator';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const conversationId = useMemo(() => crypto.randomUUID(), []);

   // Handle form submission
   const onSubmit = async ({ userPrompt }: ChatFormData) => {
      try {
         setIsBotTyping(true);
         setError(null);
         setMessages((prevMessages) => [
            ...prevMessages,
            {
               role: 'user',
               content: userPrompt,
            },
         ]);
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            userPrompt,
            conversationId,
         });
         setMessages((prevMessages) => [
            ...prevMessages,
            {
               role: 'bot',
               content: data.message,
            },
         ]);
         setIsBotTyping(false);
      } catch (error) {
         console.error(error);
         setError('An error occurred while processing your request.');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-scroll p-2">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}
            {error && (
               <div className="px-3 py-1 rounded-xl my-2 max-w-lg bg-red-100 text-red-700 text-left mr-auto rounded-tl-none">
                  {error}
               </div>
            )}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};
export default Chatbot;
