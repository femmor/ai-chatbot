import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import type { KeyboardEvent } from 'react';

type FormData = {
   userPrompt: string;
};

const Chatbot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   // Handle form submission
   const onSubmit = (data: FormData) => {
      console.log('User Prompt:', data.userPrompt);
      // Here you would typically send the prompt to your backend API
      reset();
   };

   // Handle Enter key to submit the form
   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
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
   );
};
export default Chatbot;
