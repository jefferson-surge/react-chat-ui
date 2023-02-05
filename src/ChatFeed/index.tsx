// Copyright 2017 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.

import * as React from 'react';
import BubbleGroup from '../BubbleGroup';
import DefaultChatBubble from '../ChatBubble';
import ChatInput from '../ChatInput';
import Message from '../Message';
import styles from './styles';

// Model for ChatFeed props.
interface ChatFeedInterface {
  props: {
    bubblesCentered?: boolean;
    bubbleStyles?: object;
    hasInputField?: boolean;
    isTyping?: boolean;
    maxHeight?: number;
    messages: any;
    showSenderName?: boolean;
    chatBubble?: React.Component;
    classNameArray?: string[];
    styleArray?: object[];
  };
}

// React component to render a complete chat feed
export default class ChatFeed extends React.Component {
  props;
  chat: {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
  };

  constructor(props: ChatFeedInterface) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.chat.scrollHeight;
    const height = this.chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  /**
   * Determines what type of message/messages to render.
   */
  renderMessages(messages: [Message]) {
    const { isTyping, bubbleStyles, chatBubble, showSenderName } = this.props;

    const ChatBubble = chatBubble || DefaultChatBubble;

    let group = [];
    let classNamesForGroup = [];
    let stylesForGroup = [];

    const messageNodes = messages.map((message, index) => {
      group.push(message);
      if (this.props.classNameArray && this.props.classNameArray.length > index) {
        classNamesForGroup.push(this.props.classNameArray[index]);
      }
      if (this.props.styleArray && this.props.styleArray.length > index) {
        stylesForGroup.push(this.props.styleArray[index]);
      }
      // Find diff in message type or no more messages
      if (index === messages.length - 1 || messages[index + 1].id !== message.id) {
        const messageGroup = group;
        const messageGroupClassNameArray = classNamesForGroup;
        const messageGroupStyleArray = stylesForGroup;
        group = [];
        classNamesForGroup = [];
        stylesForGroup = [];
        return (
          <BubbleGroup
            key={index}
            messages={messageGroup as [Message]}
            id={message.id as number}
            showSenderName={showSenderName}
            chatBubble={ChatBubble}
            bubbleStyles={bubbleStyles}
            classNameArray={messageGroupClassNameArray.length > 0 ? messageGroupClassNameArray as [string] : undefined}
            styleArray={messageGroupStyleArray.length > 0 ? messageGroupStyleArray as [object] : undefined}
          />
        );
      }

      return null;
    });

    // Other end is typing...
    if (isTyping) {
      messageNodes.push(
        <div key="isTyping" style={{ ...styles.chatbubbleWrapper }}>
          <ChatBubble
            message={new Message({ id: 1, message: '...', senderName: '' })}
            bubbleStyles={bubbleStyles}
          />
        </div>
      );
    }

    // return nodes
    return messageNodes;
  }

  /**
   * render : renders our chatfeed
   */
  render() {
    const inputField = this.props.hasInputField && <ChatInput />;
    const { maxHeight } = this.props;

    return (
      <div id="chat-panel" style={styles.chatPanel}>
        <div
          ref={c => {
            this.chat = c;
          }}
          className="chat-history"
          style={{ ...styles.chatHistory, maxHeight }}
        >
          <div className="chat-messages">
            {this.renderMessages(this.props.messages)}
          </div>
        </div>
        {inputField}
      </div>
    );
  }
}
