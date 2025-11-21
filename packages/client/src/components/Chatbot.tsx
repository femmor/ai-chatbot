import {
   useEffect,
   useMemo,
   useRef,
   useState,
   type KeyboardEvent,
} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { LuBot } from 'react-icons/lu';

type FormData = {
   userPrompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   role: 'user' | 'bot';
   content: string;
};

const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

   const formRef = useRef<HTMLFormElement | null>(null);

   const conversationId = useMemo(() => crypto.randomUUID(), []);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   // Handle form submission
   const onSubmit = async ({ userPrompt }: FormData) => {
      setIsBotTyping(true);
      setMessages((prevMessages) => [
         ...prevMessages,
         {
            role: 'user',
            content: userPrompt,
         },
      ]);

      reset();
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
   };

   // Handle Enter key to submit the form
   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   // Handle scroll to bottom on new message
   const scrollToBottom = () => {
      if (formRef.current) {
         formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages, isBotTyping]);

   return (
      <div className="max-w-3xl mx-auto">
         <div className="flex flex-col gap-3 mb-10">
            {messages.map((msg, index) => (
               <div
                  key={index}
                  className={`px-3 py-1 rounded-xl my-2 max-w-lg ${msg.role === 'user' ? 'bg-blue-600 text-white text-right ml-auto rounded-tr-none' : 'bg-gray-100 text-black text-left mr-auto rounded-tl-none'}`}
               >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
               </div>
            ))}
            {isBotTyping && (
               <div className="px-3 py-1 rounded-xl my-2 max-w-lg bg-gray-100 text-black text-left mr-auto rounded-tl-none animate-pulse flex items-center gap-2">
                  <LuBot size={24} />
                  ...thinking
               </div>
            )}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-md"
            ref={formRef}
         >
            <textarea
               {...register('userPrompt', {
                  required: true,
                  validate: (value) => value.trim().length > 0,
               })}
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything..."
               maxLength={1000}
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
