import { nanoid } from 'nanoid';

export class Entity {
  _id: string;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createEntity() {
  return {
    _id: nanoid()
  } as Entity;
}
