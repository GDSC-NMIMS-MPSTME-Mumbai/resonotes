export function titleCase(str: string) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
          // @ts-ignore
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

export function getAuthorData(authors: string[]) {
  if (!authors || authors.length === 0) {
      return "Anonymous"
  }
  
  if (authors.length === 1) {
      return authors[0]
  } else {
      return authors[0] + " and others"
  }
}
