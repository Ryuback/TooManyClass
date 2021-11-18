import { Entity } from './entity.model';

export interface Quality {
  name: string;
  count: number;
}

export interface Collaboration extends Entity {
  userId: string;
  givenName: string;
  fullName: string;
  qualities: Quality[];
}
