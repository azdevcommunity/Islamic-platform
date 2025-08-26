'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import HttpClient from '@/util/HttpClient';
import DashboardSkeleton from '@/components/admin/DashboardSkeleton';
import {
  FileText,
  HelpCircle,
  Users,
  Tag,
  Plus,
  Activity,
  BarChart3,
  ArrowUpRight,
  Clock,
  Eye
} from 'lucide-react';

const AdminDashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    articles: 0,
    questions: 0,
    authors: 0,
    tags: 0,
    recentArticles: [],
    recentQuestions: []
  });

  useEffect(() => {
    // Check login status from localStorage
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    // Fetch dashboard statistics
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // You can replace these with actual API calls
      const [articlesRes, questionsRes, authorsRes, tagsRes] = await Promise.allSettled([
        HttpClient.get('/articles').then(res => res.json()).catch(() => ({ length: 0 })),
        HttpClient.get('/questions').then(res => res.json()).catch(() => ({ length: 0 })),
        HttpClient.get('/authors').then(res => res.json()).catch(() => ({ length: 0 })),
        HttpClient.get('/tags').then(res => res.json()).catch(() => ({ length: 0 }))
      ]);

      setStats({
        articles: articlesRes.status === 'fulfilled' ? (Array.isArray(articlesRes.value) ? articlesRes.value.length : articlesRes.value.total || 0) : 0,
        questions: questionsRes.status === 'fulfilled' ? (Array.isArray(questionsRes.value) ? questionsRes.value.length : questionsRes.value.total || 0) : 0,
        authors: authorsRes.status === 'fulfilled' ? (Array.isArray(authorsRes.value) ? authorsRes.value.length : authorsRes.value.total || 0) : 0,
        tags: tagsRes.status === 'fulfilled' ? (Array.isArray(tagsRes.value) ? tagsRes.value.length : tagsRes.value.total || 0) : 0,
        recentArticles: articlesRes.status === 'fulfilled' && Array.isArray(articlesRes.value) ? articlesRes.value.slice(0, 5) : [],
        recentQuestions: questionsRes.status === 'fulfilled' && Array.isArray(questionsRes.value) ? questionsRes.value.slice(0, 5) : []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') !== 'true') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  const statCards = [
    {
      title: 'Məqalələr',
      value: stats.articles,
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50',
      borderColor: 'border-blue-200 dark:border-blue-800',
      href: '/admin/articles',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Suallar',
      value: stats.questions,
      icon: HelpCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      href: '/admin/questions',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Müəlliflər',
      value: stats.authors,
      icon: Users,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50',
      borderColor: 'border-amber-200 dark:border-amber-800',
      href: '/admin/authors',
      change: '+3%',
      changeType: 'positive'
    },
    {
      title: 'Teqlər',
      value: stats.tags,
      icon: Tag,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50',
      borderColor: 'border-purple-200 dark:border-purple-800',
      href: '/admin/tags',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    { label: 'Yeni Məqalə Əlavə Et', href: '/admin/articles/create', icon: FileText },
    { label: 'Yeni Sual Əlavə Et', href: '/admin/questions/create', icon: HelpCircle },
    { label: 'Yeni Müəllif Əlavə Et', href: '/admin/authors/create', icon: Users },
    { label: 'Yeni Teq Əlavə Et', href: '/admin/tags/create', icon: Tag }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">İslami platformun idarə paneli</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Son yenilənmə: {new Date().toLocaleTimeString('az-AZ')}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50 hover:-translate-y-1 ${stat.borderColor} border-2`}>
              <div className={`absolute inset-0 ${stat.bgColor} opacity-50`} />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="relative pt-0">
                <Button asChild size="sm" variant="ghost" className="w-full justify-between group-hover:bg-white/50 dark:group-hover:bg-slate-700/50">
                  <Link href={stat.href} className="flex items-center gap-2">
                    <span>İdarə et</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Overview and Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Statistics Overview */}
        <Card className="lg:col-span-2 border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200 dark:border-blue-800">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Məzmun Baxışı</CardTitle>
                  <CardDescription className="text-base">Platformdakı məzmun statistikası</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                Detallı Baxış
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {statCards.map((stat, index) => (
                <div key={index} className="group p-4 rounded-xl border-2 border-dashed border-muted hover:border-solid hover:bg-muted/30 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <div>
                        <span className="font-semibold text-sm">{stat.title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold">{stat.value}</span>
                          <Badge variant="outline" className="text-xs">
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={stat.href}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border border-emerald-200 dark:border-emerald-800">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Tez Əməliyyatlar</CardTitle>
                <CardDescription>Tez-tez istifadə olunan əməliyyatlar</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button key={index} asChild variant="outline" className="w-full justify-start h-12 group hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200">
                    <Link href={action.href} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-muted group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-200">
                        <Plus className="h-3 w-3" />
                      </div>
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{action.label}</span>
                      <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Articles */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200 dark:border-blue-800">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Son Məqalələr</CardTitle>
                  <CardDescription>Ən son əlavə edilən məqalələr</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {stats.recentArticles.length} məqalə
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentArticles.length > 0 ? (
                stats.recentArticles.map((article, index) => (
                  <div key={index} className="group p-4 rounded-xl border-2 border-dashed border-muted hover:border-solid hover:bg-muted/30 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-semibold truncate text-base">
                          {article.title || `Məqalə ${index + 1}`}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          {article.author || 'Naməlum müəllif'}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {new Date().toLocaleDateString('az-AZ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Yeni
                        </Badge>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Hələ məqalə yoxdur</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/articles/create">İlk məqaləni yarat</Link>
                  </Button>
                </div>
              )}
              {stats.recentArticles.length > 0 && (
                <Button asChild variant="ghost" className="w-full mt-4 group">
                  <Link href="/admin/articles" className="flex items-center gap-2">
                    <span>Hamısını Gör</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Questions */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border border-emerald-200 dark:border-emerald-800">
                  <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Son Suallar</CardTitle>
                  <CardDescription>Ən son əlavə edilən suallar</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {stats.recentQuestions.length} sual
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentQuestions.length > 0 ? (
                stats.recentQuestions.map((question, index) => (
                  <div key={index} className="group p-4 rounded-xl border-2 border-dashed border-muted hover:border-solid hover:bg-muted/30 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-semibold truncate text-base">
                          {question.title || question.question || `Sual ${index + 1}`}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Tag className="h-3 w-3" />
                          {question.category || 'Ümumi'}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {new Date().toLocaleDateString('az-AZ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Yeni
                        </Badge>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <HelpCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Hələ sual yoxdur</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/questions/create">İlk sualı yarat</Link>
                  </Button>
                </div>
              )}
              {stats.recentQuestions.length > 0 && (
                <Button asChild variant="ghost" className="w-full mt-4 group">
                  <Link href="/admin/questions" className="flex items-center gap-2">
                    <span>Hamısını Gör</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;