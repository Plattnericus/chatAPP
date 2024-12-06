import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Send } from "lucide-react";
import { toast } from "sonner";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatList from "@/components/chat/ChatList";
import AddContactDialog from "@/components/chat/AddContactDialog";

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
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const personalCode = "USER" + Math.floor(100000 + Math.random() * 900000).toString();

  const addContact = (name: string, code: string) => {
    const newChat: Chat = {
      id: Date.now(),
      name: name,
      messages: [],
    };

    setChats([...chats, newChat]);
    toast.success("Kontakt hinzugefügt!");
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
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <ChatHeader selectedChat={null} personalCode={personalCode} />
        <ChatList 
          chats={chats} 
          selectedChat={selectedChat} 
          onSelectChat={setSelectedChat} 
        />
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader selectedChat={selectedChat} personalCode={personalCode} />

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

            <form onSubmit={sendMessage} className="bg-white p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Nachricht schreiben..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Wähle einen Chat aus oder füge einen neuen Kontakt hinzu
          </div>
        )}

        <Button
          onClick={() => setIsAddContactOpen(true)}
          className="absolute bottom-4 right-4 rounded-full"
          size="icon"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>

        <AddContactDialog
          isOpen={isAddContactOpen}
          onClose={() => setIsAddContactOpen(false)}
          onAddContact={addContact}
        />
      </div>
    </div>
  );
};

export default Chat;