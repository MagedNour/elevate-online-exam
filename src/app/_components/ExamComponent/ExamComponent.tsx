import { QuizQuestion, UserAnswer } from '@/app/Interfaces/Interfaces';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Dispatch, SetStateAction } from "react";
import ProgressChart from '../progressChart/ProgressChart';
import ResultsComponent from '../ResultsComponent/ResultsComponent';




export default function ExamComponent({ questions, duration, setModalOpened }: { questions: QuizQuestion[]; duration: number; setModalOpened: Dispatch<SetStateAction<boolean>> }) {

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [inCorrectCount, setInCorrectCount] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState<UserAnswer[]>([]);

    const currentQuestion = questions[currentIndex];


    const handleNextQ = () => {
        setUserAnswers([...userAnswers, { question: currentQuestion, answer: selectedAnswer }]);
        calcResults()
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer("");
    }
    const handlePrevQ = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnswer("");
        }
    }

    const calcResults = () => {

        const incorrect: UserAnswer[] = userAnswers.filter((answer) => answer.answer !== answer.question.correct);
        console.log(incorrect, "incorrect");

        setIncorrectAnswers(incorrect);
        setInCorrectCount(incorrect.length);
        setCorrectCount(questions.length - incorrect.length)

    }

    useEffect(() => {
        if (timeLeft <= 0) return; // Stop the timer when it reaches 0

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, [timeLeft]);




    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };



    return (
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

            {
                showResults ? //show results
                    <ResultsComponent incorrectAnswers={incorrectAnswers} />
                    :

                    questions.length > 0 ? // Making sure we have questions to display

                        currentIndex < questions.length ? // Making sure we haven't reached the end of the questions
                            // Questions Box
                            <div className='questions-box p-5 md:p-0'>
                                {/* Headers for Questions Box */}
                                <div className="header">
                                    <div className='flex justify-between items-center'>
                                        <p className='text-primary'>Question {currentIndex + 1} of {questions.length}</p>
                                        <div className='flex items-center gap-3'>
                                            <Image width={24} height={30} src={'/image 2.png'} alt={"Timer icon"}></Image>
                                            <p className='text-[#11CE19]'>{formatTime(timeLeft)}</p>
                                        </div>
                                    </div>
                                    {/* dots for each question */}
                                    <div className='flex justify-between gap-3 mt-3 mb-8'>
                                        {questions?.map((currentQuestion, i) => {
                                            return <div key={i} className={`${i <= currentIndex ? "bg-primary" : "bg-[#D9D9D9]"} w-3 h-3  rounded-full`}></div>
                                        })}
                                    </div>

                                </div>

                                {/* Questions and Answers */}
                                <div className="container">
                                    <h4 className="mb-4 font-medium ">{currentQuestion.question}</h4>
                                    <ul className='text-[#535353] text-lg'>
                                        {currentQuestion.answers.map((answer, i) => {
                                            return <li key={i} onClick={() => setSelectedAnswer(answer.key)} className={`px-4 py-3 mb-5 rounded-md cursor-pointer ${selectedAnswer === answer.key ? "bg-[#CCD7EB]" : "bg-[#EDEFF3]"}`}>
                                                <input checked={selectedAnswer === answer.key} type="radio" name="answer" id={answer.key} value={answer.key} className='me-5' onChange={() => setSelectedAnswer(answer.key)} />
                                                <label className='text-xl cursor-pointer' htmlFor={answer.key}>{answer.answer}</label>
                                            </li>
                                        })}
                                    </ul>
                                    
                                    <div className="flex justify-between items-center space-x-4 mt-8">
                                        <div className="flex justify-between items-center gap-4 w-full">
                                            <button
                                                onClick={() => handlePrevQ()}
                                                type="button"
                                                className="flex items-center justify-center py-3 w-1/2 font-medium text-primary text-lg sm:text-xl rounded-2xl border border-primary focus:ring-4 focus:outline-none focus:ring-primary-300"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={() => handleNextQ()}
                                                disabled={!selectedAnswer}
                                                type="button"
                                                className="flex items-center justify-center py-3 w-1/2 disabled:bg-[#E5E5E5] disabled:text-[#7f7f7f] bg-primary text-white text-lg sm:text-xl font-medium rounded-2xl border border-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300"
                                            >
                                                Next
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            : // Finished answering all questions
                            <div className='results-box p-5 md:p-0'>
                                <h3>Your Score</h3>

                                <div className="flex items-center justify-center gap-5 font-sans">
                                    <ProgressChart correct={correctCount} incorrect={inCorrectCount} />
                                    <div className="flex flex-col justify-around w-4/5 md:w-2/5 gap-3">
                                        <div className='flex w-full md:w-4/5 justify-between'>
                                            <p className='text-[#02369C] text-2xl'>
                                                Correct
                                            </p>
                                            <span className="inline-block w-10 h-10 p-2 rounded-full border border-[#02369C] text-[#02369C] text-xl text-center leading-5">
                                                {correctCount}
                                            </span>


                                        </div>

                                        <div className='flex w-full md:w-4/5 justify-between'>
                                            <p className='text-[#CC1010] text-2xl'>
                                                Incorrect
                                            </p>
                                            <span className="inline-block w-10 h-10 p-2 rounded-full border border-[#CC1010] text-[#CC1010] text-xl text-center leading-5">
                                                {inCorrectCount}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-3">
                                    <button disabled className=" w-1/2 font-medium text-primary py-2 text-lg rounded-2xl border border-primary focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 ">
                                        Back
                                    </button>
                                    <button onClick={() => setShowResults(true)} className="w-1/2  bg-primary text-white text-lg  font-medium rounded-2xl border border-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 ">
                                        Show Results
                                    </button>
                                </div>


                            </div>


                        : // No questions found for this exam
                        <div className="NoQuestions flex flex-col my-5 items-center">
                            <h4> No Questions yet for this exam, please check again later...</h4>
                            <button className=" w-1/2 mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => setModalOpened(false)}>
                                Close
                            </button>

                        </div>
            }

        </div>
    )
}
