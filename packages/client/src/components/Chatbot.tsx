import { useMemo, useState, type KeyboardEvent } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';

type FormData = {
   userPrompt: string;
};

type ChatResponse = {
   message: string;
};

const Chatbot = () => {
   const [messages, setMessages] = useState<string[]>([]);

   const conversationId = useMemo(() => crypto.randomUUID(), []);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   // Handle form submission
   const onSubmit = async ({ userPrompt }: FormData) => {
      setMessages((prevMessages) => [...prevMessages, userPrompt]);

      reset();
      const { data } = await axios.post<ChatResponse>('/api/chat', {
         userPrompt,
         conversationId,
      });
      setMessages((prevMessages) => [...prevMessages, data.message]);
   };

   // Handle Enter key to submit the form
   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div>
         <div>
            {messages.map((msg, index) => (
               <div key={index}>{msg}</div>
            ))}
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
               className="w-full border-0 focus:outline-0 resize-none "
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
