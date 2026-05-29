import { getCollection } from 'astro:content';

export async function getBooksByLocale(lang: 'fr' | 'en') {
  const books = await getCollection('books');
  return books
    .filter(b => b.id.startsWith(`${lang}/`))
    .sort((a, b) => Number(b.data.date) - Number(a.data.date));
}

export async function enrichBookWithFrData(book: any) {
  const allBooks = await getCollection('books');
  const frBook = allBooks.find(
    b => b.id.startsWith('fr/') && b.data.id === book.data.id
  );
  if (!frBook) return book;
  return {
    ...book,
    data: {
      ...book.data,
      reviews: frBook.data.reviews,
      images: frBook.data.images,
    }
  };
}