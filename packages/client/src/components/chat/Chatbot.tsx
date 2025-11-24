import { useMemo, useState, type KeyboardEvent } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';
import type { ChatResponse, FormData, Message } from '@/types';
import TypingIndicator from './TypingIndicator';
import ChatMessages from './ChatMessages';

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const conversationId = useMemo(() => crypto.randomUUID(), []);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   // Handle form submission
   const onSubmit = async ({ userPrompt }: FormData) => {
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

         reset({
            userPrompt: '',
         });
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

   // Handle Enter key to submit the form
   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
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
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-md"
         >
            <textarea
               {...register('userPrompt', {
                  required: true,
                  validate: (value) => value.trim().length > 0,
               })}
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything..."
               maxLength={1000}
               autoFocus
            />
            <Button
               className="rounded-full w-9 h-9 cursor-pointer"
               type="submit"
               disabled={!formState.isValid}
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};
export default Chatbot;
