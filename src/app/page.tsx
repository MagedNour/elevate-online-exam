import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log("session", session);
  
  if(!session)
    redirect('login')
  return (
    <div>
     Home Page
     <h1 className="bg-red-500"> Hello</h1>
    </div>
  );
}
