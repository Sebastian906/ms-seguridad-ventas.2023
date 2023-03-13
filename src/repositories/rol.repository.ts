import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario, Menu, RolMenu} from '../models';
import {RolMenuRepository} from './rol-menu.repository';
import {UsuarioRepository} from './usuario.repository';
import {MenuRepository} from './menu.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {
  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  public readonly menus: HasManyThroughRepositoryFactory<Menu, typeof Menu.prototype._id,
          RolMenu,
          typeof Rol.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolMenuRepository') protected rolMenuRepositoryGetter: Getter<RolMenuRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MenuRepository') protected menuRepositoryGetter: Getter<MenuRepository>,
  ) {
    super(Rol, dataSource);
    this.menus = this.createHasManyThroughRepositoryFactoryFor('menus', menuRepositoryGetter, rolMenuRepositoryGetter,);
    this.registerInclusionResolver('menus', this.menus.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
