export const parseHexCode = (code: string) =>
  /^([0-9A-F]{6}|[0-9A-F]{3})$/.test(code.toUpperCase())
    ? `#${code.toUpperCase()}`
    : "";
