import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Manu, RolMenu, Usuario} from '../models';
import {RolMenuRepository} from './rol-menu.repository';
import {ManuRepository} from './manu.repository';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {

  public readonly menus: HasManyThroughRepositoryFactory<Manu, typeof Manu.prototype._id,
          RolMenu,
          typeof Rol.prototype._id
        >;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolMenuRepository') protected rolMenuRepositoryGetter: Getter<RolMenuRepository>, @repository.getter('ManuRepository') protected manuRepositoryGetter: Getter<ManuRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.menus = this.createHasManyThroughRepositoryFactoryFor('menus', manuRepositoryGetter, rolMenuRepositoryGetter,);
    this.registerInclusionResolver('menus', this.menus.inclusionResolver);
  }
}
