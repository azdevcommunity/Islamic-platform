/**
 * Question Form Validation Schemas
 * Using Zod for type-safe validation
 */

import { z } from 'zod';

export const questionSchema = z.object({
  question: z.string()
    .min(10, 'Sual ən azı 10 simvol olmalıdır')
    .max(1000, 'Sual maksimum 1000 simvol ola bilər')
    .regex(
      /^[a-zA-Z0-9\s\u0600-\u06FF\u0400-\u04FF.,!?;:()\-'"]+$/,
      'Yalnız mətn, rəqəmlər və əsas durğu işarələri istifadə edilə bilər'
    ),
  
  email: z.string()
    .email('Düzgün email daxil edin')
    .optional()
    .or(z.literal('')),
  
  name: z.string()
    .min(2, 'Ad ən azı 2 simvol olmalıdır')
    .max(100, 'Ad maksimum 100 simvol ola bilər')
    .optional()
    .or(z.literal('')),
  
  categoryId: z.string()
    .uuid('Düzgün kateqoriya seçin')
    .optional(),
});

export type QuestionInput = z.infer<typeof questionSchema>;

// Admin question form schema (more fields)
export const adminQuestionSchema = z.object({
  question: z.string()
    .min(10, 'Sual ən azı 10 simvol olmalıdır')
    .max(1000, 'Sual maksimum 1000 simvol ola bilər'),
  
  answer: z.string()
    .min(10, 'Cavab ən azı 10 simvol olmalıdır'),
  
  categories: z.array(z.object({
    id: z.string().or(z.number()),
    name: z.string(),
  })).min(1, 'Ən azı bir kateqoriya seçin'),
  
  tags: z.array(z.object({
    id: z.string().or(z.number()),
    name: z.string(),
  })).optional(),
  
  image: z.string().url('Düzgün URL daxil edin').optional().or(z.literal('')),
});

export type AdminQuestionInput = z.infer<typeof adminQuestionSchema>;
