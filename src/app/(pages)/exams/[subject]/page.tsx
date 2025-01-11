'use client'
import SideNavLayOut from '@/app/_components/SideNavLayOut/SideNavLayOut'
import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import axios from 'axios';
import ExamComponent from '@/app/_components/ExamComponent/ExamComponent';
import { useSession } from 'next-auth/react';
import { JSON_HEADER } from '../../../../lib/types/constants/api.constant';
import { ExamInterface, SubjectInterface, subjectWithExamsInterface } from '../../../Interfaces/Interfaces';

const inter = Inter({ subsets: ['latin'] });



type PageProps = {
  params: { subject: string }
}

export default function Exam({ params }: PageProps) {
  const [exams, setExams] = useState<ExamInterface[]>([]);
  const [subjects, setSubjects] = useState<SubjectInterface[]>([]);
  const [subjectsWithExams, setSubjectsWithExams] = useState<subjectWithExamsInterface[]>([]);
  const [questions, setQuestions] = useState([])
  const [modalOpened, setModalOpened] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
  const [currentExamDuration, setCurrentExamDuration] = useState(0)
  const { data: session, status } = useSession();



  // Fetch subjects
  const getSubjects = async () => {
    const res = await fetch("https://exam.elevateegy.com/api/v1/subjects", {
      method: "GET",
      headers: {
        ...JSON_HEADER,
        token: session?.token || ""
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setSubjects(data.subjects);
  };

  // Fetch exams
  const getExams = async () => {
    try {
      const subjectId = params?.subject;

      if (subjectId === "all") {
        const res = await axios.get("https://exam.elevateegy.com/api/v1/exams", {
          headers: { token: session?.token || "" },
        });
        console.log("exams", res.data.exams);

        setExams(res.data.exams);
      } else {
        const res = await axios.get(`https://exam.elevateegy.com/api/v1/exams?subject=${subjectId}`, {
          headers: { token: session?.token || "" },
        });
        console.log("exams", res.data.exams);

        setExams(res.data.exams);
      }

    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };


  // Open Exam Modal
  const handleOpenExam = (id: string, duration: number) => {
    setCurrentExamDuration(duration)
    getQuestionsForExam(id)
    setModalOpened(true)
  }

  // Fetch Questions
  const getQuestionsForExam = async (id: string) => {
    try {

      const res = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`, {
        headers: { token: session?.token || "" },
      });

      console.log("questions", res.data.questions);
      setQuestions(res.data.questions);


    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }


  // Organize data after subjects and exams are loaded
  useEffect(() => {
    if (subjects?.length > 0 && exams.length > 0) {

      // Organize data to get Array of subjects with their exams
      const organizedData: subjectWithExamsInterface[] = subjects?.map((subject) => ({
        subjectName: subject.name,
        exams: exams.filter((exam) => exam.subject === subject._id),  // Filter exams by subject
      }));

      setSubjectsWithExams(organizedData);
    }
  }, [subjects, exams]);

  // Fetch subjects and exams after user is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.token) {
      getSubjects();
      getExams();
    }
  }, [session, status]);



  return (
    <SideNavLayOut>
      <div className={`w-10/12 mx-auto mt-20 px-5 py-5 ${inter.className}`}>
        {subjectsWithExams?.map(({ subjectName, exams }) => (

          exams.length > 0 && <div key={subjectName} className="subject-section my-4">
            <h2 className="text-xl font-bold">{subjectName}</h2>
            <div className="exams-list">
              {exams.map((exam) => (
                <div className="subjectExams" key={exam._id}>
                  <div className="bg-white rounded-[10px] flex justify-between px-4 py-2">
                    <div>
                      <p className="font-medium">{exam.title}</p>
                      <p className="text-[13px] text-[#535353]">{exam.numberOfQuestions + " Questions"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[13px]">{exam.duration + " Minutes"}</p>
                      <button onClick={() => handleOpenExam(exam._id, exam.duration)} className="bg-primary text-white py-[4px] px-[24px] rounded-[10px]">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <!-- Exam Modal --> */}
      {modalOpened && <div aria-hidden={!modalOpened}
        className={`flex bg-black bg-opacity-65 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full`}>
        <div className="relative w-10/12 lg:w-5/12 md:h-auto">

          {/* <!-- Modal content --> */}
          {examStarted ?
            <ExamComponent setModalOpened={setModalOpened} questions={questions} duration={currentExamDuration} />
            :
            // <!-- Instructions Modal -->
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 p-5 ">
              {/* <!-- Close Modal Button X --> */}
              <button onClick={() => setModalOpened(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="logOutModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <h4 className="mb-4 font-medium text-2xl">Instructions</h4>
              <ul className='text-[#535353] text-lg list-disc ms-5'>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
              </ul>
              <div className="flex justify-center items-center space-x-4 mt-5">
                <button onClick={() => setExamStarted(true)} type="button" className="bg-primary w-screen py-2 px-3 font-medium text-white rounded-2xl border border-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 ">
                  Start
                </button>

              </div>
            </div>}
        </div>
      </div>}
    </SideNavLayOut>
  );
}
