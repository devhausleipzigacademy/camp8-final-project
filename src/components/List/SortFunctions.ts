import { Category, List } from "@/pages/list/[slug]";
import { Item } from "@prisma/client";

export function sortByAlphabet(input: Item[]): Item[] {
  const sorted = [...input];
  sorted.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sorted;
}

export function sortByCategory(input: Array<Category>): Array<Category> {
  const sorted = [...input];
  sorted.sort((a, b) => {
    const categoryA = a.name.toUpperCase();
    const categoryB = b.name.toUpperCase();

    if (categoryA < categoryB) {
      return -1;
    }
    if (categoryA > categoryB) {
      return 1;
    }

    sortByAlphabet(a.item);

    return 0;
  });
  return sorted;
}

export function sortByDate(input: Item[]): Item[] {
  const sorted = [...input];
  sorted.sort((a, b) => {
    const nameA = a.createdAt;
    const nameB = b.createdAt;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sorted;
}
