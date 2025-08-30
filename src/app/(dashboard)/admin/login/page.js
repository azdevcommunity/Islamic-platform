'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { AlertCircle, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Static credentials check
    if (username === 'admin' && password === 'password') {
      // Store login status (simple example using localStorage)
      localStorage.setItem('isAdminLoggedIn', 'true');
      router.push('/admin'); // Redirect to admin dashboard
    } else {
      setError('Geçersiz kullanıcı adı veya şifre');
      localStorage.removeItem('isAdminLoggedIn');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200 dark:border-blue-800">
              <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Admin Girişi
            </CardTitle>
            <p className="text-muted-foreground">
              Admin paneline erişim için giriş yapın
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-semibold">
                Kullanıcı Adı
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanıcı adınızı girin"
                required
                disabled={loading}
                className="h-11 border-2 focus:border-blue-300 dark:focus:border-blue-700 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                required
                disabled={loading}
                className="h-11 border-2 focus:border-blue-300 dark:focus:border-blue-700 transition-colors"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading || !username || !password}
              className="w-full h-11 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Giriş Yap
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>Demo hesap: admin / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage; 