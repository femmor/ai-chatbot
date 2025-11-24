import { FaArrowUp } from 'react-icons/fa';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import type { ChatFormData, ChatInputProps } from '@/types';
import type { KeyboardEvent } from 'react';

const ChatInput = ({ onSubmit }: ChatInputProps) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   // Handle Enter key to submit the form
   const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(handleFormSubmit)();
      }
   };

   // Handle form submission
   const handleFormSubmit = async (data: ChatFormData) => {
      reset();
      await onSubmit(data);
   };

   return (
      <form
         onSubmit={handleSubmit(handleFormSubmit)}
         onKeyDown={handleKeyDown}
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
   );
};
export default ChatInput;
