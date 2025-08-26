import { QuestionForm } from "@/components/admin/questions/QuestionForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NewQuestionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/admin/questions">
              <ArrowLeft className="h-4 w-4" />
              Geri
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Yeni Sual Əlavə Et
            </h1>
            <p className="text-lg text-muted-foreground">İslami sual və cavab əlavə edin</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-2 shadow-xl">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border border-emerald-200 dark:border-emerald-800">
              <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Sual Məlumatları</CardTitle>
              <CardDescription className="text-base">Sual və cavab məlumatlarını daxil edin</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <QuestionForm />
        </CardContent>
      </Card>
    </div>
  )
}

