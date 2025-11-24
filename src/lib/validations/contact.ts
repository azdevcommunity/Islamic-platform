/**
 * Contact Form Validation Schema
 */

import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Ad ən azı 2 simvol olmalıdır')
    .max(100, 'Ad maksimum 100 simvol ola bilər')
    .regex(
      /^[a-zA-Z\s\u0600-\u06FF\u0400-\u04FF\-']+$/,
      'Yalnız hərflər istifadə edilə bilər'
    ),
  
  email: z.string()
    .email('Düzgün email daxil edin')
    .max(255, 'Email maksimum 255 simvol ola bilər'),
  
  subject: z.string()
    .min(5, 'Mövzu ən azı 5 simvol olmalıdır')
    .max(200, 'Mövzu maksimum 200 simvol ola bilər'),
  
  message: z.string()
    .min(20, 'Mesaj ən azı 20 simvol olmalıdır')
    .max(2000, 'Mesaj maksimum 2000 simvol ola bilər'),
  
  phone: z.string()
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'Düzgün telefon nömrəsi daxil edin'
    )
    .optional()
    .or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
