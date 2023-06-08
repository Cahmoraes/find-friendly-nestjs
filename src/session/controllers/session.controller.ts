import { Body, Controller, Post } from '@nestjs/common'
import { SessionService } from '../services/session.service'
import { CredentialDTO } from '../dto/credential.dto'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() credential: CredentialDTO) {
    const token = await this.sessionService.create(credential)
    return { token }
  }
}
