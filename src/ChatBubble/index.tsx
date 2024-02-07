import * as React from 'react';
import ChatBubbleProps from './interface';
import styles from './styles';

const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {},
};

export default class ChatBubble extends React.Component {
  props;

  constructor(props: ChatBubbleProps) {
    super(props);
  }

  public render() {
    const { bubblesCentered, message } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
          ...styles.chatbubble,
          ...bubblesCentered ? {} : styles.chatbubbleOrientationNormal,
          ...chatbubble,
          ...userBubble,
          ...this.props.style,
        }
        : {
          ...styles.chatbubble,
          ...styles.recipientChatbubble,
          ...bubblesCentered
            ? {}
            : styles.recipientChatbubbleOrientationNormal,
          ...userBubble,
          ...chatbubble,
          ...this.props.style,
        };

    // If message content is a string, render as a bubble.
    // Otherwise, it's a React component, so render as-is.
    const bubbleContent = typeof message.message === 'string' ? (
      <div style={chatBubbleStyles} className={this.props.classNameString || ""}>
        <p style={{ ...styles.p, ...text }} dangerouslySetInnerHTML={{ __html: this.props.message.message }}></p>
      </div>
      ) : message.message;

    return (
      <div
        style={{
          ...styles.chatbubbleWrapper,
        }}
      >
        {bubbleContent}
      </div>
    );
  }
}

export { ChatBubbleProps };
