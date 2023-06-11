import { Test } from '@nestjs/testing'
import { SessionService } from './session.service'
import { AuthService } from '../../auth/services/auth.service'
import { OrgService } from '../../org/services/org.service'
import { orgServiceMock } from '../../../testing/services/org.service.mock'
import { authServiceMock } from '../../../testing/services/auth.service.mock'
import { CredentialDTO } from '../dto/credential.dto'

describe('SessionService', () => {
  let sessionService: SessionService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SessionService, AuthService, OrgService],
    })
      .overrideProvider(OrgService)
      .useValue(orgServiceMock)
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile()

    sessionService = module.get(SessionService)
  })

  test('should be defined', () => {
    expect(sessionService).toBeDefined()
  })

  test('should create a token', async () => {
    const credentialDTO: CredentialDTO = {
      email: 'example@email.com',
      password: '123456',
    }
    const token = await sessionService.create(credentialDTO)
    expect(token).toEqual('token')
  })
})
