export function parseResource(data) {
  return typeof data === "string" ? JSON.parse(data) : data;
}
