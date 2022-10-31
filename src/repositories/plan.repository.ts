import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Mascotas} from '../models';
import {MascotasRepository} from './mascotas.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascotas, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>,
  ) {
    super(Plan, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
