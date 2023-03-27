import { Category } from "@/pages/list/[slug]";
import { Item } from "@prisma/client";

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
  return sorted.reverse();
}

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

export function sortByCategory(input: Array<Item>): Array<Item> {
  const sorted = [...input];
  sorted.sort((a, b) => {
    const categoryA = a.category.toUpperCase();
    const categoryB = b.category.toUpperCase();

    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (categoryA < categoryB) {
      return -1;
    }
    if (categoryA > categoryB) {
      return 1;
    }

    if (categoryA === categoryB) {
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    }

    return 0;
  });
  return sorted;
}
