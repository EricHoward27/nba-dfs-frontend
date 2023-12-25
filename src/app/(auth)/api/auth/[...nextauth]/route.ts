import NextAuth from "next-auth";
import { authOptions } from "../../../../../lib/authOption";

// export auth options
NextAuth(authOptions); // remove export default for production
const handler = NextAuth(authOptions); 
export { handler as GET, handler as POST }