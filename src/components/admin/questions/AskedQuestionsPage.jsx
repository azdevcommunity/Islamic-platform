
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import HttpClient from '@/util/HttpClient';
import { formatDate } from '@/util/DateUtil';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
    CheckCircle,
    HelpCircle,
    RotateCcw,
    Inbox,
    AlertTriangle,
    MessageSquare,
    RefreshCw,
    Filter,
    X,
    Clock,
    User,
    Mail,
    List,
    Table,
    Phone
} from 'lucide-react';

// Import shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const QUESTIONS_PER_PAGE = 15;

// Helper to get status display properties
const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return { icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Oxunub' };
        case 'pending':
        default:
            return { icon: HelpCircle, color: 'text-yellow-600 bg-yellow-100', text: 'Oxunmayıb' };
    }
};

// Custom hook for query parameters
function useQueryState(key, defaultValue = '') {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(() => searchParams.get(key) ?? defaultValue);

    const updateQuery = useCallback((newValue) => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // Get current params
        if (newValue.trim() === '' || newValue === defaultValue || (key === 'status' && newValue === 'all')) {
            current.delete(key);
        } else {
            current.set(key, newValue);
        }
        // Reset page when filter changes
        current.delete('page');

        const search = current.toString();
        const query = search ? `?${search}` : "";
        // Use router.push for navigation without page reload
        router.push(`/admin/asked-questions${query}`);

        // No need to update local state here, useEffect below will handle it
    }, [key, defaultValue, searchParams, router]);

    // Update state if URL changes externally
    useEffect(() => {
        setValue(searchParams.get(key) ?? defaultValue);
    }, [searchParams, key, defaultValue]);


    return [value, updateQuery, setValue]; // Return setValue for direct input control
}


export default function AskedQuestionsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // State
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'

    // Filters using custom hook
    const [statusFilter, setStatusFilter] = useQueryState('status', 'all');
    const [searchQuery, setSearchQuery, setSearchQueryInput] = useQueryState('search', '');
    const page = parseInt(searchParams.get('page') || '1', 10); // Get page from URL

    // Fetch Questions
    const fetchAdminQuestions = useCallback(async (currentPage, currentStatus, currentSearch) => {
        setLoading(true);
        setError(null);
        try {
            // API parameters matching the provided endpoint structure
            const params = new URLSearchParams({
                page: (currentPage - 1).toString(), // API uses 0-based indexing
                size: QUESTIONS_PER_PAGE.toString(),
                sortBy: 'createdAt',
                sortDir: 'DESC'
            });

            // Add search parameter if provided
            if (currentSearch) {
                params.set('search', currentSearch);
            }

            // Add status filter if provided (assuming API supports it)
            if (currentStatus && currentStatus !== 'all') {
                params.set('read', currentStatus === 'approved' ? 'true' : 'false');
            }

            const response = await HttpClient.get(`/contact?${params.toString()}`);
            const data = await response.json();

            // Map the contact API response to our question format
            const mappedQuestions = data.content.map((contact) => ({
                id: contact.id,
                question: contact.message, // Use message as question
                subject: contact.subject, // Additional field for subject
                status: contact.read ? 'approved' : 'pending', // Map read status to our status
                createdAt: contact.createdAt,
                user: {
                    id: contact.id, // Use contact id as user id
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone
                }
            }));

            setQuestions(mappedQuestions);
            setTotalPages(data.page.totalPages);

        } catch (err) {
            console.error("Error fetching admin questions:", err);
            setError("Suallar yüklənərkən xəta baş verdi.");
            setQuestions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, []); // Dependencies are handled via useEffect


    // Effect to fetch data when URL params change
    useEffect(() => {
        const currentSearch = searchParams.get('search') ?? '';
        const currentStatus = searchParams.get('status') ?? 'all';
        const currentPage = parseInt(searchParams.get('page') || '1', 10);
        fetchAdminQuestions(currentPage, currentStatus, currentSearch);
    }, [searchParams, fetchAdminQuestions]); // Re-run when URL changes

    // --- Event Handlers ---
    const handleSearchChange = (e) => {
        setSearchQueryInput(e.target.value); // Update input value immediately
    };

    // Handler to apply search (e.g., on button click or after debounce if implemented)
    const applySearch = () => {
        setSearchQuery(searchQuery); // This updates the URL via useQueryState
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const current = new URLSearchParams(Array.from(searchParams.entries()));
            current.set('page', newPage.toString());
            router.push(`/admin/asked-questions?${current.toString()}`);
        }
    };

    const resetFilters = () => {
        // Resetting state triggers URL update via useQueryState hooks
        setSearchQuery('');
        setStatusFilter('all');
        // Explicitly navigate to base URL without filters
        router.push('/admin/asked-questions');
    };

    const hasActiveFilters = !!(searchQuery || (statusFilter && statusFilter !== 'all'));

    // --- Render Logic ---
    const StatusBadge = ({ status }) => {
        const { icon: Icon, color, text } = getStatusProps(status);
        return (
            <Badge className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border-0 ${color}`}>
                <Icon size={14} />
                {text}
            </Badge>
        );
    };

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
                                    İstifadəçi Sualları
                                </h1>
                                <p className="text-gray-600 mt-2 text-lg">
                                    İstifadəçilərin göndərdiyi sualları idarə edin və cavablandırın
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchAdminQuestions(page, statusFilter, searchQuery)}
                                className="gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Yenilə
                            </Button>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                {questions.length} Sual
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="relative z-10 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Oxunmayıb</p>
                                <p className="text-3xl font-bold text-yellow-600">
                                    {questions.filter(q => q.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="relative z-10 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Oxunub</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {questions.filter(q => q.status === 'approved').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative overflow-hidden bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="relative z-10 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Ümumi</p>
                                <p className="text-3xl font-bold text-emerald-600">
                                    {questions.length}
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                                <MessageSquare className="h-6 w-6 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter Controls */}
            <Card className="relative bg-white border border-gray-200 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                <CardHeader className="relative z-10 border-b bg-gradient-to-r from-emerald-50/50 to-emerald-100/50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-gray-900">
                            <Search className="h-5 w-5" />
                            Axtarış və Filtr
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                                className={`gap-2 ${viewMode === 'list' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'}`}
                            >
                                <List className="h-4 w-4" />
                                Siyahı
                            </Button>
                            <Button
                                variant={viewMode === 'table' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('table')}
                                className={`gap-2 ${viewMode === 'table' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'}`}
                            >
                                <Table className="h-4 w-4" />
                                Cədvəl
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        {/* Search Input */}
                        <div className="space-y-2">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700">Axtarış</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    type="search"
                                    id="search"
                                    name="search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={(e) => e.key === 'Enter' && applySearch()}
                                    placeholder="Sual mətni, istifadəçi..."
                                    className="pl-10 h-12 border-2 focus:border-emerald-300 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="space-y-2">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="h-12 border-2 focus:border-emerald-300">
                                    <SelectValue placeholder="Bütün Statuslar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Bütün Statuslar</SelectItem>
                                    <SelectItem value="pending">Oxunmayıb</SelectItem>
                                    <SelectItem value="approved">Oxunub</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Reset Button */}
                        {hasActiveFilters && (
                            <div className="flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={resetFilters}
                                    className="h-12 gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    Filtrləri Sıfırla
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Active filters display */}
                    {hasActiveFilters && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <div className="flex flex-wrap gap-2 items-center justify-between">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        Aktiv filtrlər:
                                    </span>

                                    {searchQuery && (
                                        <Badge variant="secondary" className="gap-1 px-3 py-1">
                                            <Search className="h-3 w-3" />
                                            Axtarış: {searchQuery}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSearchQuery("")}
                                                className="h-4 w-4 p-0 hover:bg-slate-200 rounded-full ml-1"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    )}

                                    {statusFilter && statusFilter !== 'all' && (
                                        <Badge variant="outline" className="gap-1 px-3 py-1 border-emerald-200 text-emerald-700 bg-emerald-50">
                                            Status: {statusFilter === 'pending' ? 'Oxunmayıb' : 'Oxunub'}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setStatusFilter("all")}
                                                className="h-4 w-4 p-0 hover:bg-emerald-200 rounded-full ml-1"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={resetFilters}
                                    className="gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50"
                                >
                                    <X className="h-4 w-4" />
                                    Hamısını Təmizlə
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Questions Display */}
            {loading ? (
                <Card className="border-2 shadow-lg">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={`skel-${i}`} className="animate-pulse">
                                    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            <div className="flex gap-2">
                                                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                                                <div className="h-5 bg-gray-200 rounded-full w-24"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : error ? (
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
                            <Button
                                onClick={() => fetchAdminQuestions(page, statusFilter, searchQuery)}
                                className="gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Yenidən cəhd edin
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : questions.length === 0 ? (
                <Card className="border-2 shadow-lg">
                    <CardContent className="py-16">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                <Inbox className="h-10 w-10 text-slate-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">
                                    {hasActiveFilters ? "Filtrlərə uyğun sual tapılmadı" : "Heç bir sual tapılmadı"}
                                </h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    {hasActiveFilters
                                        ? "Filtrləri dəyişin və ya yeni axtarış edin"
                                        : "Hələ heç bir sual göndərilməyib"
                                    }
                                </p>
                            </div>
                            {hasActiveFilters && (
                                <Button variant="outline" onClick={resetFilters} className="gap-2">
                                    <X className="h-4 w-4" />
                                    Filtrləri Sıfırla
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : viewMode === 'list' ? (
                <div className="space-y-4">
                    {questions.map((q) => (
                        <Card key={q.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 border-2 hover:border-emerald-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CardContent className="relative z-10 p-6">
                                <div className="flex items-start gap-4">
                                    {/* Status Icon */}
                                    <div className="flex-shrink-0">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${q.status === 'approved' ? 'bg-green-100' :
                                            q.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'
                                            }`}>
                                            {(() => {
                                                const { icon: Icon } = getStatusProps(q.status);
                                                return <Icon className="h-6 w-6" />;
                                            })()}
                                        </div>
                                    </div>

                                    {/* Question Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="mb-2">
                                                    {q.subject && (
                                                        <h4 className="font-semibold text-emerald-600 text-sm mb-1">
                                                            {q.subject}
                                                        </h4>
                                                    )}
                                                    <h3 className="font-medium text-gray-900 text-base line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                        {q.question || 'N/A'}
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
                                                    {q.user && (
                                                        <div className="flex items-center gap-1">
                                                            <User className="h-4 w-4" />
                                                            <span>{q.user.name || 'Anonim'}</span>
                                                        </div>
                                                    )}
                                                    {q.user?.email && (
                                                        <div className="flex items-center gap-1">
                                                            <Mail className="h-4 w-4" />
                                                            <span className="truncate max-w-48">{q.user.email}</span>
                                                        </div>
                                                    )}
                                                    {q.user?.phone && (
                                                        <div className="flex items-center gap-1">
                                                            <Phone className="h-4 w-4" />
                                                            <span>{q.user.phone}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{formatDate(q.createdAt || q.submittedAt)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <StatusBadge status={q.status} />
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex-shrink-0">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-10 w-10 rounded-xl hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 transition-all duration-200 hover:scale-105"
                                                >
                                                    <Link href={`/admin/asked-questions/${q.id}`}>
                                                        <Eye className="h-5 w-5" />
                                                        <span className="sr-only">Detallara Bax</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                /* Table View */
                <Card className="relative overflow-hidden bg-white border border-gray-200 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/5" />
                    <div className="relative z-10 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-emerald-50/50 to-emerald-100/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Sual
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        İstifadəçi
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Tarix
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Əməliyyatlar
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {questions.map((q, index) => (
                                    <tr key={q.id} className={`hover:bg-emerald-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                        <td className="px-6 py-4">
                                            <div className="max-w-md">
                                                {q.subject && (
                                                    <p className="font-semibold text-emerald-600 text-xs mb-1">
                                                        {q.subject}
                                                    </p>
                                                )}
                                                <p className="font-medium text-gray-900 line-clamp-2 text-sm leading-relaxed">
                                                    {q.question || 'N/A'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {q.user ? (
                                                    <>
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {q.user.name || 'Anonim'}
                                                            </span>
                                                        </div>
                                                        {q.user.email && (
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="h-4 w-4 text-gray-400" />
                                                                <span className="text-xs text-gray-500 truncate max-w-40">
                                                                    {q.user.email}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {q.user.phone && (
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4 text-gray-400" />
                                                                <span className="text-xs text-gray-500">
                                                                    {q.user.phone}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-sm text-gray-500">-</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={q.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {formatDate(q.createdAt || q.submittedAt)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 rounded-lg hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 transition-all duration-200 hover:scale-105"
                                            >
                                                <Link href={`/admin/asked-questions/${q.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                    <span className="sr-only">Detallara Bax</span>
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Pagination */}
            {!loading && !error && questions.length > 0 && totalPages > 1 && (
                <Card className="border-2 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700 font-medium">
                                Səhifə {page} / {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="h-10 w-10 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Əvvəlki səhifə</span>
                                </Button>

                                <div className="flex items-center gap-1">
                                    {/* Add page numbers if needed */}
                                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                                        {page}
                                    </span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="h-10 w-10 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Növbəti səhifə</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
