function charCount(string) {
  const count = {};

  const newString = string.trim();

  for (i = 0; i < newString.length; i++) {
    const char = newString[i].toUpperCase();

    if (char === " ") continue;

    if (count[char]) {
      count[char] = count[char] + 1;
    } else {
      count[char] = 1;
    }
  }

  return count;
}

// const value = charCount("hello my is Adarsh");
const value = charCount("Adarsh tiwari");

console.log(value);
