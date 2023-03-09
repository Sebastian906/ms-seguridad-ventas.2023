import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {RolMenu} from './rol-menu.model';

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

  @hasMany(() => Rol, {through: {model: () => RolMenu, keyFrom: 'menuId'}})
  roles: Rol[];

  constructor(data?: Partial<Manu>) {
    super(data);
  }
}

export interface ManuRelations {
  // describe navigational properties here
}

export type ManuWithRelations = Manu & ManuRelations;
