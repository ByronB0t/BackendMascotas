import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascotas,
  Plan,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasPlanController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
  ): Promise<Plan> {
    return this.mascotasRepository.plan(id);
  }
}
