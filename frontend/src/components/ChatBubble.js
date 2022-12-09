import "./css/chatbubble.css";
import FlexLayout from "./FlexLayout";

const ChatBubble = (props) => {
    return (
        <FlexLayout direction="vertical" align="center" >
            <div className={`chatbubble-root received`}>
                {props.children}
            </div>
        </FlexLayout >
    )
}

export default ChatBubble;