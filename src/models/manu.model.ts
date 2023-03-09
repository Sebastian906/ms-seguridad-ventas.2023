import {Entity, model, property} from '@loopback/repository';

@model()
export class Manu extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;


  constructor(data?: Partial<Manu>) {
    super(data);
  }
}

export interface ManuRelations {
  // describe navigational properties here
}

export type ManuWithRelations = Manu & ManuRelations;
