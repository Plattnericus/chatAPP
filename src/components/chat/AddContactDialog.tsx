import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (name: string, code: string) => void;
}

const AddContactDialog = ({ isOpen, onClose, onAddContact }: AddContactDialogProps) => {
  const [newContactName, setNewContactName] = useState("");
  const [newContactCode, setNewContactCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactCode.trim()) {
      toast.error("Bitte füllen Sie alle Felder aus!");
      return;
    }

    onAddContact(newContactName, newContactCode);
    setNewContactName("");
    setNewContactCode("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neuen Kontakt hinzufügen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Benutzername"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />
          <Input
            placeholder="Benutzercode"
            value={newContactCode}
            onChange={(e) => setNewContactCode(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Hinzufügen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;