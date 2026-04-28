// TYPES
import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

export const serviceOptions: { id: typesServiceOptionId; label: string }[] = [
    { id: 'bridal-trial', label: 'Prueba de novia' },
    { id: 'social-makeup', label: 'Maquillaje social' },
    { id: 'facial-cleansing', label: 'Limpieza facial' },
    { id: 'maderotherapy', label: 'Maderoterapia' },
    { id: 'dermapen', label: 'Dermapen' },
    { id: 'lymphatic-drainage', label: 'Drenaje linfático' }
] as const;