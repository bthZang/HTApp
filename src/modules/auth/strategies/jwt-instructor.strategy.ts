import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InstructorService } from 'src/modules/instructor/instructor.service';

@Injectable()
export class JwtInstructorStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly instructorService: InstructorService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: { sub: string; id: string }) {
    const user = await this.instructorService.findOne(payload.id);

    return { userId: payload.sub, ...user };
  }
}
