import { LuBot } from 'react-icons/lu';

const TypingIndicator = () => {
   return (
      <>
         <div className="px-3 py-1 rounded-xl my-2 max-w-lg bg-gray-100 text-black text-left mr-auto rounded-tl-none animate-pulse flex items-center gap-2">
            <LuBot size={24} />
            ...thinking
         </div>
      </>
   );
};
export default TypingIndicator;
