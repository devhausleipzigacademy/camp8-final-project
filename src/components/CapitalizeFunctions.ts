export function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function capitalizeCategory(category: string) {
  let arr = category.split("-");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "and") {
      continue;
    }
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}
