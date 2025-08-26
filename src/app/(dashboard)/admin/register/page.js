'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('info'); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password !== confirmPassword) {
      setMessage('Şifreler eşleşmiyor');
      setMessageSeverity('error');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Şifre en az 6 karakter olmalıdır');
      setMessageSeverity('error');
      setLoading(false);
      return;
    }

    setMessage('Kayıt başarılı! (Demo amaçlı - gerçek kayıt işlemi yapılmadı)');
    setMessageSeverity('success');
    setLoading(false);
    // TODO: Add actual registration logic here
  };

  const passwordsMatch = password === confirmPassword;
  const isFormValid = username && password && confirmPassword && passwordsMatch;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md border-2 shadow-xl">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 border border-green-200 dark:border-green-800">
              <UserPlus className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
              Admin Kayıt
            </CardTitle>
            <p className="text-muted-foreground">
              Yeni admin hesabı oluşturun
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {message && (
            <Alert className={messageSeverity === 'error' 
              ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
              : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
            }>
              {messageSeverity === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              )}
              <AlertDescription className={messageSeverity === 'error'
                ? "text-red-800 dark:text-red-200"
                : "text-green-800 dark:text-green-200"
              }>
                {message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
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
                className="h-11 border-2 focus:border-green-300 dark:focus:border-green-700 transition-colors"
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
                placeholder="Şifrenizi girin (en az 6 karakter)"
                required
                disabled={loading}
                className="h-11 border-2 focus:border-green-300 dark:focus:border-green-700 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-base font-semibold">
                Şifreyi Onayla
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifrenizi tekrar girin"
                required
                disabled={loading}
                className={`h-11 border-2 transition-colors ${
                  confirmPassword && !passwordsMatch 
                    ? 'border-red-300 focus:border-red-500 dark:border-red-700 dark:focus:border-red-500' 
                    : 'focus:border-green-300 dark:focus:border-green-700'
                }`}
              />
              {confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Şifreler eşleşmiyor
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={loading || !isFormValid}
              className="w-full h-11 gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Kayıt yapılıyor...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Kayıt Ol
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Zaten hesabın var mı?{' '}
              <Link 
                href="/admin/login" 
                className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:underline transition-colors"
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage; 