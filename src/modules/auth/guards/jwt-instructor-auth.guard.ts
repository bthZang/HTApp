import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtInstructorAuthGuard extends AuthGuard('jwt-instructor') {}
