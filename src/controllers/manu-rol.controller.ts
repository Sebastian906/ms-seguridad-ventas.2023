import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Manu,
RolMenu,
Rol,
} from '../models';
import {ManuRepository} from '../repositories';

export class ManuRolController {
  constructor(
    @repository(ManuRepository) protected manuRepository: ManuRepository,
  ) { }

  @get('/manus/{id}/rols', {
    responses: {
      '200': {
        description: 'Array of Manu has many Rol through RolMenu',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.manuRepository.roles(id).find(filter);
  }

  @post('/manus/{id}/rols', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Manu.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRolInManu',
            exclude: ['_id'],
          }),
        },
      },
    }) rol: Omit<Rol, '_id'>,
  ): Promise<Rol> {
    return this.manuRepository.roles(id).create(rol);
  }

  @patch('/manus/{id}/rols', {
    responses: {
      '200': {
        description: 'Manu.Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Partial<Rol>,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.manuRepository.roles(id).patch(rol, where);
  }

  @del('/manus/{id}/rols', {
    responses: {
      '200': {
        description: 'Manu.Rol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.manuRepository.roles(id).delete(where);
  }
}
