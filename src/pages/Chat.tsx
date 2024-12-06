import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Send } from "lucide-react";
import { toast } from "sonner";

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

const Chat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newChatName, setNewChatName] = useState("");

  const addChat = () => {
    if (!newChatName.trim()) {
      toast.error("Bitte gib einen Chat-Namen ein!");
      return;
    }

    const newChat: Chat = {
      id: Date.now(),
      name: newChatName,
      messages: [],
    };

    setChats([...chats, newChat]);
    setNewChatName("");
    toast.success("Chat erstellt!");
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMsg],
    };

    setChats(chats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)));
    setSelectedChat(updatedChat);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <div className="mb-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Neuer Chat"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
            />
            <Button onClick={addChat} size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
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
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200">
              <h2 className="font-semibold">{selectedChat.name}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-whatsapp-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="bg-white p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Nachricht schreiben..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="bg-whatsapp-primary hover:bg-whatsapp-dark">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Wähle einen Chat aus oder erstelle einen neuen Chat
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;