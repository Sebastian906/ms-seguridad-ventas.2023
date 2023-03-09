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
Rol,
RolMenu,
Manu,
} from '../models';
import {RolRepository} from '../repositories';

export class RolManuController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/manus', {
    responses: {
      '200': {
        description: 'Array of Rol has many Manu through RolMenu',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manu)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Manu>,
  ): Promise<Manu[]> {
    return this.rolRepository.menus(id).find(filter);
  }

  @post('/rols/{id}/manus', {
    responses: {
      '200': {
        description: 'create a Manu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manu)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manu, {
            title: 'NewManuInRol',
            exclude: ['_id'],
          }),
        },
      },
    }) manu: Omit<Manu, '_id'>,
  ): Promise<Manu> {
    return this.rolRepository.menus(id).create(manu);
  }

  @patch('/rols/{id}/manus', {
    responses: {
      '200': {
        description: 'Rol.Manu PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manu, {partial: true}),
        },
      },
    })
    manu: Partial<Manu>,
    @param.query.object('where', getWhereSchemaFor(Manu)) where?: Where<Manu>,
  ): Promise<Count> {
    return this.rolRepository.menus(id).patch(manu, where);
  }

  @del('/rols/{id}/manus', {
    responses: {
      '200': {
        description: 'Rol.Manu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Manu)) where?: Where<Manu>,
  ): Promise<Count> {
    return this.rolRepository.menus(id).delete(where);
  }
}
