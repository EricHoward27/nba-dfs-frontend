import 'next-auth';
import { User } from 'next-auth';
import {JWT} from 'next-auth/jwt';

declare module 'next-auth' {
    // extending the accessToken in Session type so that Typescripts understand the type for accessToken
   interface User {
    id: string;
   }

   interface Session {
    user?: User;
    accessToken?: string;
   }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user?: User;
        accessToken?:string;
    }
}