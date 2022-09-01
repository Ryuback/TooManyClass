export function isEqualObject<T>(obj: T, objToCompare: T): boolean {
  return JSON.stringify(obj) === JSON.stringify(objToCompare);
}
