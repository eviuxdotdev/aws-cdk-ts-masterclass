export function parseJson(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (e) {
    throw new JsonError(e.message);
  }
}

export class JsonError extends Error {}
