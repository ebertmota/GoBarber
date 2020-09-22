import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersMonthAvailabilityService from '@modules/appointments/services/ListProvidersMonthAvailabilityService';

export default class ProvidersMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.body;

    const listProvidersMonthAvailability = container.resolve(
      ListProvidersMonthAvailabilityService,
    );

    const availability = await listProvidersMonthAvailability.execute({
      month,
      provider_id,
      year,
    });

    return res.json(availability);
  }
}
