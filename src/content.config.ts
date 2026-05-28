import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'

const reviewSchema = z.object({
  text: z.string(),
  link: z.string(),
  date : z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  published: z.string().optional()

});

const bookimagesSchema = z.object({
  image: z.string(),
  alt: z.string()
})

const tagSchema = z.object({
  name: z.string().optional()
});

const booksSchema = z.object({
  title: z.string(),
  date: z.string(),
  thumbnail: z.string(),
  lead: z.string(),
  reviews: z.array(reviewSchema).optional(),
  images: z.array(bookimagesSchema).optional()
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
  tags: z.array(tagSchema).optional()
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

const academic_en = defineCollection({
  loader: glob({
    base: './src/content/academic/en',
    pattern: '**/*.{md,mdx}',
  }),
  schema: academicSchema,
});

const academic_fr = defineCollection({
  loader: glob({
    base: './src/content/academic/fr',
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
  academic_en,
  academic_fr
};