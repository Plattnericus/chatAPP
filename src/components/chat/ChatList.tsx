interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

const ChatList = ({ chats, selectedChat, onSelectChat }: ChatListProps) => {
  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            selectedChat?.id === chat.id
              ? "bg-whatsapp-light"
              : "hover:bg-gray-100"
          }`}
        >
          <h3 className="font-medium">{chat.name}</h3>
          {chat.messages.length > 0 && (
            <p className="text-sm text-gray-500 truncate">
              {chat.messages[chat.messages.length - 1].text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;