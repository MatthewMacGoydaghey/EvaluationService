import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Observable } from "rxjs"
import { IS_PUBLIC_KEY } from "../DTO/auth/constats"



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private Reflector: Reflector) {

  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

  const isPublic = this.Reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass()
  ])

  if (isPublic) {
    return true
  }

   const request = context.switchToHttp().getRequest()
   try {
    const JWTtoken = request.headers.jwt
    if (!JWTtoken) {
      throw new UnauthorizedException({message: 'JWT token not found'})
    }
   const user = this.jwtService.verify(JWTtoken)
   request['user'] = user
   return true
   } catch (error) {
    throw new UnauthorizedException({message: error})
   }
  }
  
}