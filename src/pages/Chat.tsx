import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Menu, ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactCode, setNewContactCode] = useState("");
  const personalCode = "USER" + Math.floor(100000 + Math.random() * 900000).toString();

  const addContact = () => {
    if (!newContactName.trim() || !newContactCode.trim()) {
      toast.error("Bitte füllen Sie alle Felder aus!");
      return;
    }

    const newChat: Chat = {
      id: Date.now(),
      name: newContactName,
      messages: [],
    };

    setChats([...chats, newChat]);
    setNewContactName("");
    setNewContactCode("");
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
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <p className="text-sm font-medium">Ihr persönlicher Code:</p>
                <p className="text-lg font-bold text-whatsapp-dark">{personalCode}</p>
              </div>
            </PopoverContent>
          </Popover>
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
      <div className="flex-1 flex flex-col relative">
        {selectedChat ? (
          <>
            <div className="bg-white p-4 border-b border-gray-200">
              <h2 className="font-semibold">{selectedChat.name}</h2>
            </div>

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
            Wähle einen Chat aus oder füge einen neuen Kontakt hinzu
          </div>
        )}

        {/* Add Contact Button and Popup */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="absolute bottom-4 right-4 rounded-full bg-whatsapp-primary hover:bg-whatsapp-dark"
              size="icon"
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h3 className="font-semibold">Neuen Kontakt hinzufügen</h3>
              <Input
                type="text"
                placeholder="Benutzername"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Benutzercode"
                value={newContactCode}
                onChange={(e) => setNewContactCode(e.target.value)}
              />
              <Button
                onClick={addContact}
                className="w-full bg-whatsapp-primary hover:bg-whatsapp-dark"
              >
                Hinzufügen
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Chat;