export type Message = {
   role: 'user' | 'bot';
   content: string;
};

export type ChatFormData = {
   userPrompt: string;
};

export type ChatResponse = {
   message: string;
};

export type ChatInputProps = {
   onSubmit: (data: ChatFormData) => Promise<void>;
};
