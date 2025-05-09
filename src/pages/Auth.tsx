import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type UserRole = "Bakery" | "Saver" | null;

interface SaverFormData {
  name: string;
  publicKey: string;
}

const Auth = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [saverForm, setSaverForm] = useState<SaverFormData>({
    name: "",
    publicKey: "",
  });
  const navigate = useNavigate();

  const handleSaverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSaverForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement authentication logic here
      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === "Bakery") {
      navigate("/bakery-profile");
    }
  };

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bread-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Welcome to Bread Rescue Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-6">Choose your role to continue</p>
            <div className="flex flex-col gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={() => handleRoleSelect("Bakery")}
                className="w-full"
              >
                I am a Bakery
              </Button>
              <Separator className="my-2" />
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleRoleSelect("Saver")}
                className="w-full"
              >
                I am a Saver
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (role === "Saver") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bread-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Saver Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaverSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={saverForm.name}
                  onChange={handleSaverChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicKey">Wallet Public Key</Label>
                <Input
                  id="publicKey"
                  name="publicKey"
                  placeholder="Enter your wallet public key"
                  value={saverForm.publicKey}
                  onChange={handleSaverChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setRole(null)}
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default Auth; 