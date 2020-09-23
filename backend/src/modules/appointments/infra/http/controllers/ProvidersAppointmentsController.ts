import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProvidersAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const listProvidersAppointments = container.resolve(
      ListProvidersAppointmentService,
    );

    const appointments = await listProvidersAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}
