import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
   id: string;
   message: string;
}

export const chatService = {
   sendMessage: async (
      conversationId: string,
      userPrompt: string
   ): Promise<ChatResponse> => {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: userPrompt,
         temperature: 0.7,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      // set conversation history
      conversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
