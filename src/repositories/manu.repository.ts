import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Manu, ManuRelations} from '../models';

export class ManuRepository extends DefaultCrudRepository<
  Manu,
  typeof Manu.prototype._id,
  ManuRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Manu, dataSource);
  }
}
