import { getServerSession } from "next-auth";
import { authOptions } from '../app/(auth)/api/auth/[...nextauth]/route';
import Nav from "./Nav";

export default async function ServerSideNav() {
    const session = await getServerSession(authOptions);
    return (
    <div className="p-24">
        <Nav user={session?.user} expires={session?.expires as string }/>
    </div>
    )
}