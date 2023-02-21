import { List } from "@/pages/list";

export function sortByAlphabet(input: List) {
  input.sort((a, b) => {
    const nameA = a.item.toUpperCase();
    const nameB = b.item.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
export function sortByCategory(input: List) {
  input.sort((a, b) => {
    const categoryA = a.category.toUpperCase();
    const categoryB = b.category.toUpperCase();

    const nameA = a.item.toUpperCase();
    const nameB = b.item.toUpperCase();

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
      return 0;
    }
    return 0;
  });
}

export function sortByDate() {}
