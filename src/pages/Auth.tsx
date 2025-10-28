// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner";
// import { TreePine } from "lucide-react";

// const Auth = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "" });

//   useEffect(() => {
//     // Placeholder for future auth session check if backend adds auth
//   }, []);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: loginData.email,
//           password: loginData.password,
//         }),
//       });
//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data?.error || "Invalid credentials");
//       }

//       toast.success("Successfully logged in!");
//       navigate("/");
//     } catch (error: any) {
//       toast.error("Login failed", {
//         description: error.message || "Invalid credentials"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (signupData.password !== signupData.confirmPassword) {
//       toast.error("Passwords don't match");
//       return;
//     }

//     if (signupData.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: signupData.email.split('@')[0],
//           email: signupData.email,
//           password: signupData.password,
//         }),
//       });
//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data?.error || "Could not create account");
//       }

//       toast.success("Account created successfully!", {
//         description: "You can now log in with your credentials"
//       });
//       setSignupData({ email: "", password: "", confirmPassword: "" });
//     } catch (error: any) {
//       toast.error("Signup failed", {
//         description: error.message || "Could not create account"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
//       <Card className="w-full max-w-md p-8">
//         <div className="flex items-center justify-center mb-6">
//           <TreePine className="h-12 w-12 text-green-600" />
//         </div>
//         <h1 className="text-3xl font-heading font-bold text-center mb-2">GREEN LEGACY</h1>
//         <p className="text-center text-muted-foreground mb-6">Admin Portal</p>

//         <Tabs defaultValue="login" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="login">Login</TabsTrigger>
//             <TabsTrigger value="signup">Sign Up</TabsTrigger>
//           </TabsList>

//           <TabsContent value="login">
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="login-email">Email</Label>
//                 <Input
//                   id="login-email"
//                   type="email"
//                   placeholder="admin@greenlegacy.org"
//                   value={loginData.email}
//                   onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="login-password">Password</Label>
//                 <Input
//                   id="login-password"
//                   type="password"
//                   value={loginData.password}
//                   onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </form>
//           </TabsContent>

//           <TabsContent value="signup">
//             <form onSubmit={handleSignup} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="signup-email">Email</Label>
//                 <Input
//                   id="signup-email"
//                   type="email"
//                   placeholder="admin@greenlegacy.org"
//                   value={signupData.email}
//                   onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="signup-password">Password</Label>
//                 <Input
//                   id="signup-password"
//                   type="password"
//                   placeholder="Min. 6 characters"
//                   value={signupData.password}
//                   onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirm-password">Confirm Password</Label>
//                 <Input
//                   id="confirm-password"
//                   type="password"
//                   value={signupData.confirmPassword}
//                   onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? "Creating account..." : "Sign Up"}
//               </Button>
//             </form>
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// };

// export default Auth;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { TreePine } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "" });

  useEffect(() => {
    // Placeholder for future auth session check if backend adds auth
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Invalid credentials");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      toast.success("Successfully logged in!");
      navigate("/dashboard"); // Redirect to the dashboard after login
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "Invalid credentials"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupData.email.split('@')[0],
          email: signupData.email,
          password: signupData.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Could not create account");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      toast.success("Account created successfully!", {
        description: "You can now log in with your credentials"
      });
      setSignupData({ email: "", password: "", confirmPassword: "" });
      navigate("/dashboard"); // Redirect to the dashboard after signup
    } catch (error: any) {
      toast.error("Signup failed", {
        description: error.message || "Could not create account"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-6">
          <TreePine className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-center mb-2">GREEN LEGACY</h1>
        <p className="text-center text-muted-foreground mb-6">Admin Portal</p>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@greenlegacy.org"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="admin@greenlegacy.org"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;