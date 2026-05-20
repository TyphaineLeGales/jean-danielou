// 1. Importer des utilitaires depuis `astro:content`
import { defineCollection } from 'astro:content';

// 2. Importer un ou plusieurs chargeurs
import { glob, file } from 'astro/loaders';

// 3. Importer Zod
import { z } from 'astro/zod';


const books_fr = defineCollection({
  loader: glob({ base: './src/content/books/fr', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    thumbnail: z.string().optional(),
    body: z.string().optional(),
  }),
});

const books_en = defineCollection({
  loader: glob({ base: './src/content/books/en', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    thumbnail: z.string().optional(),
    body: z.string().optional(),
  }),
});

// 5. Exporter un seul objet `collections` pour enregistrer votre ou vos collections
export const collections = { books_fr, books_en };