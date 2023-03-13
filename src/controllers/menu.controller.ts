import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Manu} from '../models';
import {ManuRepository} from '../repositories';

export class MenuController {
  constructor(
    @repository(ManuRepository)
    public manuRepository : ManuRepository,
  ) {}

  @post('/menu')
  @response(200, {
    description: 'Manu model instance',
    content: {'application/json': {schema: getModelSchemaRef(Manu)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manu, {
            title: 'NewManu',
            exclude: ['_id'],
          }),
        },
      },
    })
    manu: Omit<Manu, '_id'>,
  ): Promise<Manu> {
    return this.manuRepository.create(manu);
  }

  @get('/menu/count')
  @response(200, {
    description: 'Manu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Manu) where?: Where<Manu>,
  ): Promise<Count> {
    return this.manuRepository.count(where);
  }

  @get('/menu')
  @response(200, {
    description: 'Array of Manu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Manu, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Manu) filter?: Filter<Manu>,
  ): Promise<Manu[]> {
    return this.manuRepository.find(filter);
  }

  @patch('/menu')
  @response(200, {
    description: 'Manu PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manu, {partial: true}),
        },
      },
    })
    manu: Manu,
    @param.where(Manu) where?: Where<Manu>,
  ): Promise<Count> {
    return this.manuRepository.updateAll(manu, where);
  }

  @get('/menu/{id}')
  @response(200, {
    description: 'Manu model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manu, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Manu, {exclude: 'where'}) filter?: FilterExcludingWhere<Manu>
  ): Promise<Manu> {
    return this.manuRepository.findById(id, filter);
  }

  @patch('/menu/{id}')
  @response(204, {
    description: 'Manu PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manu, {partial: true}),
        },
      },
    })
    manu: Manu,
  ): Promise<void> {
    await this.manuRepository.updateById(id, manu);
  }

  @put('/menu/{id}')
  @response(204, {
    description: 'Manu PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() manu: Manu,
  ): Promise<void> {
    await this.manuRepository.replaceById(id, manu);
  }

  @del('/menu/{id}')
  @response(204, {
    description: 'Manu DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.manuRepository.deleteById(id);
  }
}
