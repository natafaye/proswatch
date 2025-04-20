export const parseHexCodeList = (input: string): string[] =>
  input
    .split("\n")
    .map((line) => (/([0-9A-F]{6}|[0-9A-F]{3})/.test(line) ? `#${line}` : ""));
