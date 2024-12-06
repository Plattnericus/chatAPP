import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    // Generiere 6-stelligen Code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generatedCode);
    toast.info(`Dein Verifizierungscode: ${generatedCode}`);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === verificationCode) {
      toast.success("Erfolgreich verifiziert!");
      navigate("/chat");
    } else {
      toast.error("Falscher Code!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-whatsapp-dark">Verifizierung</h1>
          <p className="mt-2 text-gray-600">
            Gib den 6-stelligen Code ein, den du erhalten hast
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <Input
            type="text"
            placeholder="Verifizierungscode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full text-center text-2xl tracking-widest"
          />

          <Button type="submit" className="w-full bg-whatsapp-primary hover:bg-whatsapp-dark">
            Verifizieren
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verify;