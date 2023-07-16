import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { firebaseAdmin } from './firebase-admin.config';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Custom logic to check if the request is authenticated
   
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
  
    const token = authHeader?.split(' ')[1];
   
    // Check if the request is authenticated using Firebase Admin SDK
    try {
        const user = await firebaseAdmin.auth().verifyIdToken(token);
        console.log("token "+token+ " user " + !!user)
        return !!user;
    } catch (error) {
        console.log("error "+ error)
        return false;
    }
   
  }
}
