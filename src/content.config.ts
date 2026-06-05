import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// --- Shared schemas ---

const reviewSchema = z.object({
  link: z.string().optional(),
  date: z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  published: z.string().optional(),
});

const imagesSchema = z.object({
  image: z.string().optional(),
  alt: z.string().optional(),
});

const tagSchema = z.object({
  name: z.string().optional(),
});

const collaboratorSchema = z.object({
  name: z.string(),
});

// --- Collection schemas ---

const landingSchema = z.object({
  catch: z.string(),
  text: z.string(),
});

const booksSchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.string(),
  thumbnail: z.string(),
  lead: z.string(),
  reviews: z.array(reviewSchema).optional(),
  images: z.array(imagesSchema).optional(),
});

const mediasSchema = z.object({
  title: z.string(),
  date: z.string(),
  link: z.string().url(),
  publishedon: z.string(),
  text: z.string(),
});

const academicSchema = z.object({
  title: z.string(),
  date: z.string(),
  link: z.string().url(),
  publishedon: z.string(),
  text: z.string(),
  tags: z.array(tagSchema).optional(),
});

const collaborationsSchema = z.object({
  title: z.string(),
  collaborators: z.array(collaboratorSchema),
  time: z.string(),
  thumbnail: z.string(),
  thumbnailalt: z.string(),
  images: z.array(imagesSchema),
  pdf: z.string().optional(),
  lead: z.string()
});

// --- Collections ---
// Each collection now covers both locales under the same folder,
// matching Decap's multiple_folders i18n structure: <folder>/<locale>/<slug>.md

const landing = defineCollection({
  loader: glob({ base: './src/content/landing', pattern: '**/*.{md,mdx}' }),
  schema: landingSchema,
});

const books = defineCollection({
  loader: glob({ base: './src/content/books', pattern: '**/*.{md,mdx}' }),
  schema: booksSchema,
});

const medias = defineCollection({
  loader: glob({ base: './src/content/medias', pattern: '**/*.{md,mdx}' }),
  schema: mediasSchema,
});

const academic = defineCollection({
  loader: glob({ base: './src/content/academic', pattern: '**/*.{md,mdx}' }),
  schema: academicSchema,
});

const collaborations = defineCollection({
  loader: glob({ base: './src/content/collaborations', pattern: '**/*.{md,mdx}' }),
  schema: collaborationsSchema,
});

const selected = defineCollection({
  loader: glob({ base: './src/content/selected', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    link: z.string(),
    date: z.string(),
  }),
});

const cv = defineCollection({
  loader: glob({base: './src/content/cv', pattern: '**/*.{md,mdx}'}),
  schema: z.object({
    pdf: z.string(),
  })
})

export const collections = {
  landing,
  books,
  medias,
  academic,
  collaborations,
  selected,
  cv
};