'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { useSession } from "next-auth/react"; // Import useSession hook
import { JSON_HEADER } from "../../../lib/types/constants/api.constant";




const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});



interface subjectInterface {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}


export default function Quizzes() {

  const router = useRouter();
  const { data: session, status } = useSession(); // Get session and status
  
  const [subjects, setSubjects] = useState<subjectInterface[]>([])
  
  

  const getSubjects = async () => {
    
    const res = await fetch("https://exam.elevateegy.com/api/v1/subjects", {
      method: "GET",
      headers:{
        ...JSON_HEADER,
        token: session?.token || ""
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setSubjects(data.subjects);
  }

  useEffect(() => {
    // Ensure the session is loaded and the token exists
    if (status === "authenticated" && session?.token) {
      getSubjects()
    }
  }, [session, status]);


  return (
    <div className={`bg-white w-8/12 mx-auto mt-20 rounded-[20px] px-5 py-5 quizzes ${poppins.className}`}>
      <div className="flex justify-between text-2xl mb-3">
        <button className="text-primary font-medium">Quizzes</button>
        <button onClick={() => router.push('/exams/all')} className="text-primary font-medium hidden md:block">View All</button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {subjects?.map((subject) => (
          <div onClick={() => router.push(`/exams/${subject._id}`)} key={subject._id} className="col-span-1 rounded-xl relative cursor-pointer">
            <Image src={subject.icon} alt={subject.name} width={100} height={100} className="w-full h-auto object-contain" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#1935CA66] px-3 py-1 rounded-md">
              <p className="text-white font-bold text-center">{subject.name}</p></div>
          </div>
        ))}
      </div>



      <button className="text-primary font-medium md:hidden mt-3">View All</button>


    </div>
  )
}
