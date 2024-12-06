import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, Check, ArrowLeft } from "lucide-react";

const Verify = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Bitte geben Sie eine gültige E-Mail-Adresse ein");
      return;
    }
    
    // Hier würde normalerweise der E-Mail-Versand über Supabase erfolgen
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generatedCode);
    setIsEmailSent(true);
    toast.success(`Verifizierungscode wurde an ${email} gesendet`);
    console.log("Verifizierungscode:", generatedCode); // Für Testzwecke
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === verificationCode) {
      toast.success("E-Mail erfolgreich verifiziert!");
      navigate("/chat");
    } else {
      toast.error("Falscher Verifizierungscode!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="relative w-full">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 top-0 p-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-whatsapp-dark">ChatApp</h1>
            {!isEmailSent ? (
              <p className="mt-2 text-gray-600">
                Geben Sie Ihre E-Mail-Adresse ein, um sich zu verifizieren
              </p>
            ) : (
              <p className="mt-2 text-gray-600">
                Geben Sie den Code ein, den Sie per E-Mail erhalten haben
              </p>
            )}
          </div>
        </div>

        {!isEmailSent ? (
          <form onSubmit={handleSendEmail} className="mt-8 space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="E-Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-whatsapp-primary hover:bg-whatsapp-dark"
            >
              Code senden
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="mt-8 space-y-6">
            <div className="relative">
              <Check className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Verifizierungscode"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                maxLength={6}
                className="pl-10 text-center text-2xl tracking-widest"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-whatsapp-primary hover:bg-whatsapp-dark"
            >
              Verifizieren
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Verify;