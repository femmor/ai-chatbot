export type Message = {
   role: 'user' | 'bot';
   content: string;
};

export type FormData = {
   userPrompt: string;
};

export type ChatResponse = {
   message: string;
};
