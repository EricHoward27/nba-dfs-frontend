import NextAuth from "next-auth";
import { authOptions } from "../../../../../lib/authOption";

// export auth options
export default NextAuth(authOptions);
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }