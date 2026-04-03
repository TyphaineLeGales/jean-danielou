// 1. Importer des utilitaires depuis `astro:content`
import { defineCollection } from 'astro:content';

// 2. Importer un ou plusieurs chargeurs
import { glob, file } from 'astro/loaders';

// 3. Importer Zod
import { z } from 'astro/zod';

// 4. Définir un `loader` et un `schema` pour chaque collection
const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    titleFR: z.string(),
    titleEN: z.string(),
    descriptionFR: z.string(),
    descriptionEN: z.string(),
    date: z.coerce.date(),
  }),
});

// 5. Exporter un seul objet `collections` pour enregistrer votre ou vos collections
export const collections = { publications };