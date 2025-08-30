'use client'

import React, {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import HttpClient from '@/util/HttpClient';
import {formatDate} from '@/util/DateUtil';
import {
    ChevronLeft,
    CheckCircle,
    HelpCircle,
    User,
    Loader2,
    AlertTriangle,
    MessageSquare,
    Mail,
    Clock,
    RefreshCw,
    Phone
} from 'lucide-react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

// Helper to get status display properties (can be shared or redefined)
const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return {icon: CheckCircle, color: 'text-green-600 bg-green-100 border-green-200', text: 'Oxunub'};
        case 'pending':
        default:
            return {icon: HelpCircle, color: 'text-yellow-600 bg-yellow-100 border-yellow-200', text: 'Oxunmayıb'};
    }
};

export default function AdminQuestionDetailPage() {
    const params = useParams();
    const {id} = params; // Get ID from URL

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState({approve: false, reject: false});
    const [actionError, setActionError] = useState(null);

    // Fetch Question Details
    const fetchQuestionDetail = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await HttpClient.get(`/contact/${id}`);
            const data = await response.json();
            
            // Map the contact API response to our question format
            const mappedQuestion = {
                id: data.id,
                question: data.message,
                subject: data.subject,
                status: data.read ? 'approved' : 'pending',
                createdAt: data.createdAt,
                user: {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                }
            };
            
            setQuestion(mappedQuestion);
        } catch (err) {
            console.error("Error fetching question detail:", err);
            setError("Sual detalları yüklənərkən xəta baş verdi.");
            setQuestion(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchQuestionDetail();
    }, [fetchQuestionDetail]);

    // --- Action Handlers ---
    const handleAction = async (actionType) => {
        setActionLoading(prev => ({...prev, [actionType]: true}));
        setActionError(null);
        try {
            // For contact API, we only have "mark as read" functionality
            if (actionType === 'approve') {
                await HttpClient.patch(`/contact/${id}/read`);

                // Update local state on success
                setQuestion(prev => ({ ...prev, status: 'approved' }));
            }

        } catch (err) {
            console.error(`Error ${actionType}ing question:`, err);
            setActionError(err.message || "Gözlənilməyən xəta baş verdi.");
        } finally {
            setActionLoading(prev => ({...prev, [actionType]: false}));
        }
    };

    // --- Render Logic ---
    const StatusDisplay = ({status}) => {
        const {icon: Icon, color, text} = getStatusProps(status);
        return (
            <Badge className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-0 ${color}`}>
                <Icon size={18}/>
                {text}
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8">
                <Card className="border-2 shadow-lg">
                    <CardContent className="py-16">
                        <div className="flex justify-center items-center">
                            <div className="text-center space-y-4">
                                <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mx-auto"/>
                                <p className="text-gray-600">Sual detalları yüklənir...</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8">
                <Card className="border-2 shadow-lg border-red-200">
                    <CardContent className="py-16">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                <AlertTriangle className="h-10 w-10 text-red-600" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-red-600">Xəta baş verdi!</h3>
                                <p className="text-gray-600">{error}</p>
                            </div>
                            <div className="flex gap-3 justify-center">
                                <Button
                                    onClick={fetchQuestionDetail}
                                    className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Yenidən cəhd edin
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/admin/asked-questions" className="gap-2">
                                        <ChevronLeft className="h-4 w-4"/>
                                        Siyahıya Qayıt
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8">
                <Card className="border-2 shadow-lg">
                    <CardContent className="py-16">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <HelpCircle className="h-10 w-10 text-slate-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">Sual Tapılmadı</h3>
                                <p className="text-gray-600">Bu ID ilə sual mövcud deyil.</p>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/admin/asked-questions" className="gap-2">
                                    <ChevronLeft className="h-4 w-4"/>
                                    Siyahıya Qayıt
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white p-4 md:p-8 space-y-8">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-600/10 to-emerald-500/10" />
                <div className="relative z-10 p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-0.5 shadow-xl">
                                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                                        <MessageSquare className="h-8 w-8 text-emerald-600" />
                                    </div>
                                </div>
                                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-20 blur-xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Sual Detalları
                                </h1>
                                <p className="text-gray-600 mt-2 text-lg">
                                    İstifadəçi sualının tam məlumatları
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button asChild variant="outline" size="sm" className="gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300">
                                <Link href="/admin/asked-questions">
                                    <ChevronLeft className="h-4 w-4"/>
                                    Siyahıya Qayıt
                                </Link>
                            </Button>
                            <StatusDisplay status={question.status}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Error Message */}
            {actionError && (
                <Card className="border-2 shadow-lg border-red-200">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="h-5 w-5 text-red-600"/>
                            </div>
                            <div>
                                <h3 className="font-semibold text-red-600">Əməliyyat Xətası</h3>
                                <p className="text-sm text-red-600">{actionError}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Main Content Card */}
            <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 border-b bg-gradient-to-r from-emerald-50/50 to-emerald-100/50">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <MessageSquare className="h-5 w-5" />
                        Sual Məlumatları
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 p-8">
                    <div className="space-y-8">
                        {/* Submission Date */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                                <Clock className="h-6 w-6 text-blue-600"/>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">Göndərilmə Tarixi</h3>
                                <p className="text-gray-600">{formatDate(question.createdAt || question.submittedAt)}</p>
                            </div>
                        </div>

                        {/* User Info (Optional) */}
                        {question.user && (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                                    <User className="h-6 w-6 text-purple-600"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">İstifadəçi Məlumatları</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-400"/>
                                            <span className="text-gray-600">{question.user.name || 'Anonim'}</span>
                                        </div>
                                        {question.user.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-400"/>
                                                <span className="text-gray-600">{question.user.email}</span>
                                            </div>
                                        )}
                                        {question.user.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-400"/>
                                                <span className="text-gray-600">{question.user.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Subject */}
                        {question.subject && (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="h-6 w-6 text-blue-600"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-3">Mövzu</h3>
                                    <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                                        <p className="text-blue-800 font-medium text-lg">{question.subject}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Question Text */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="h-6 w-6 text-emerald-600"/>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-3">Mesaj Mətni</h3>
                                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">{question.question}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                {/* Actions Section (Only if unread) */}
                {question.status?.toLowerCase() === 'pending' && (
                    <div className="relative z-10 bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 px-8 py-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Mesajı oxunmuş kimi işarələ</h3>
                                <p className="text-sm text-gray-600">Bu mesajı oxunmuş kimi qeyd edin</p>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleAction('approve')}
                                    disabled={actionLoading.approve}
                                    className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {actionLoading.approve ? <Loader2 className="h-4 w-4 animate-spin"/> : <CheckCircle className="h-4 w-4"/>}
                                    Oxunmuş kimi işarələ
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
