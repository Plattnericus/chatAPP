import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error("Bitte alle Felder ausfüllen!");
      return;
    }

    // Simuliere erfolgreiche Anmeldung/Registrierung
    toast.success(isLogin ? "Erfolgreich angemeldet!" : "Registrierung erfolgreich!");
    navigate("/verify");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-whatsapp-dark">ChatApp</h1>
          <p className="mt-2 text-gray-600">
            {isLogin ? "Melde dich an" : "Erstelle einen Account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Benutzername"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Passwort"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="w-full bg-whatsapp-primary hover:bg-whatsapp-dark">
            {isLogin ? "Anmelden" : "Registrieren"}
          </Button>

          <p className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-whatsapp-dark hover:underline"
            >
              {isLogin
                ? "Noch keinen Account? Registriere dich"
                : "Bereits einen Account? Melde dich an"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;