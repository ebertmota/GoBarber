import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersDayAvailabilityService from '@modules/appointments/services/ListProvidersDayAvailabilityService';

export default class ProvidersDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, day, year } = req.body;

    const listProvidersDayAvailability = container.resolve(
      ListProvidersDayAvailabilityService,
    );

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(availability);
  }
}
