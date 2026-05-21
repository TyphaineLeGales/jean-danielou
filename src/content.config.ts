import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'

const reviewSchema = z.object({
  text: z.string(),
  link: z.string().url(),
});

const booksSchema = z.object({
  title: z.string(),
  date: z.string(),
  thumbnail: z.string(),
  lead: z.string(),
  reviews: z.array(reviewSchema).optional(),
});

const mediasSchema = z.object({
  title: z.string(),
  date: z.string(),
  link: z.string().url(),
  publishedon: z.string(),
  text: z.string(),
});

const landingSchema = z.object({
  catch: z.string(),
  text: z.string()
})

const landing_en = defineCollection({
  loader: glob({
    base: './src/content/landing/en',
    pattern: '**/*.{md,mdx}'
  }),
  schema: landingSchema
})

const landing_fr = defineCollection({
  loader: glob({
    base: './src/content/landing/fr',
    pattern: '**/*.{md,mdx}'
  }),
  schema: landingSchema
})


const books_en = defineCollection({
  loader: glob({
    base: './src/content/books/en',
    pattern: '**/*.{md,mdx}',
  }),
  schema: booksSchema,
});

const books_fr = defineCollection({
  loader: glob({
    base: './src/content/books/fr',
    pattern: '**/*.{md,mdx}',
  }),
  schema: booksSchema,
});

const medias_en = defineCollection({
  loader: glob({
    base: './src/content/medias/en',
    pattern: '**/*.{md,mdx}',
  }),
  schema: mediasSchema,
});

const medias_fr = defineCollection({
  loader: glob({
    base: './src/content/medias/fr',
    pattern: '**/*.{md,mdx}',
  }),
  schema: mediasSchema,
});

export const collections = {
  landing_en,
  landing_fr,
  books_en,
  books_fr,
  medias_en,
  medias_fr,
};