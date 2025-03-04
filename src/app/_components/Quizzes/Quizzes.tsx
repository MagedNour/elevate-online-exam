'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';




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
  
  const [subjects, setSubjects] = useState<subjectInterface[]>([])
  
  

  const getSubjects = async () => {
    try {
      const res = await fetch("/api/subjects", {
        method: "GET",
        headers: {
          
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSubjects(data.data.subjects);

    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
      getSubjects()
  }, []);


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
