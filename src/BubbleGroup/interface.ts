import { Message, ChatBubble } from '../';
export default interface BubbleGroupInterface {
  key: number;
  messages: [Message];
  id: number;
  showSenderName: boolean;
  chatBubble: ChatBubble;
  bubbleStyles: any;
};
