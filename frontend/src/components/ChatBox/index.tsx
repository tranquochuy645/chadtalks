import { FC, useState, useCallback } from 'react';
import { ProfileData } from '../../pages/Main';
import { ChatRoom } from '../RoomsList';
import InputBar from '../InputBar';
import ChatBoxTopBar from '../ChatBoxTopBar';
import MessagesContainer from '../MessagesContainer';
import { Message } from '../MessagesContainer';
import './style.css';



export interface ChatRoomData {
  messages: Message[];
  conversationLength: number;
  isMeeting?: boolean;
  meeting_uuid?: string | null;
}

interface ChatBoxProps {
  token: string;
  room: ChatRoom;
  profile: ProfileData;
}


const ChatBox: FC<ChatBoxProps> = ({ room, token, profile }) => {
  const [justSent, setJustSent] = useState<boolean>(false);

  const handleJustSent = useCallback(() => {
    setJustSent(true);
  }, []);
  return (
    <div id="chat-box">
      <ChatBoxTopBar
        token={token}
        userId={profile._id}
        room={room}
      />
      {room && <MessagesContainer
        justSent={justSent}
        room={room}
        token={token}
        userId={profile._id}
      />}
      {room && <InputBar
        token={token}
        userId={profile._id}
        roomId={room._id}
        onJustSent={handleJustSent}
      />}
    </div>
  );
};

export default ChatBox;
