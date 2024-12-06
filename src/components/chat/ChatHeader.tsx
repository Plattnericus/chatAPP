import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  selectedChat: {
    name: string;
  } | null;
  personalCode: string;
}

const ChatHeader = ({ selectedChat, personalCode }: ChatHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <button
        onClick={() => navigate(-1)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      
      {selectedChat && <h2 className="font-semibold">{selectedChat.name}</h2>}
      
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
  );
};

export default ChatHeader;