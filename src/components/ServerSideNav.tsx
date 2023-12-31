import { getServerSession } from "next-auth";
import { authOptions } from '../lib/authOption';
import Nav from "./Nav";

export default async function ServerSideNav() {
    const session = await getServerSession(authOptions);
    return (
    <div className="p-24 ">
        <Nav user={session?.user} expires={session?.expires as string } />
    </div>
    )
}