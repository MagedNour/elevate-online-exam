import React from 'react'
import { UserAnswer } from '../../Interfaces/Interfaces'

export default function ResultsComponent({ incorrectAnswers }: { incorrectAnswers: UserAnswer[] }) {
    return (
        <div className="results-container overflow-y-scroll p-5 grid md:grid-cols-2 gap-5 h-[80vh]">

            {incorrectAnswers.map((question, i) => {
                return (
                    <div key={i} className=" rounded-2xl bg-[#F9F9F9] p-3">
                        <h4 className="mb-4 font-light ">{question.question.question}</h4>
                        <ul className='text-[#535353] '>
                            {question.question.answers.map((answer, i) => {
                                return <li
                                    key={i}
                                    className={`px-4 py-3 mb-5 rounded-md cursor-pointer overflow-auto text-sm 
                                  ${question.question.correct === answer.key ? "bg-[#CAF9CC] border border-[#11CE19]" : ""}
                                  ${question.answer === answer.key ? "bg-[#F8D2D2] border border-[#CC1010]" : "bg-[#EDEFF3]"}`}
                                >
                                    <input checked={question.question.correct === answer.key || question.answer === answer.key} type="checkbox" name="answer" id={answer.key} value={answer.key}
                                        className={`me-5 ${question.question.correct === answer.key?"checked:accent-[#11CE19]":"checked:accent-[#CC1010]" } `}
                                    />
                                    <label className='text-sm cursor-pointer' htmlFor={answer.key}>{answer.answer}</label>
                                </li>
                            })}
                        </ul>


                    </div>
                )
            })}

            <div className='flex flex-col justify-end pb-5' >
                <button
                    onClick={() => window.location.reload()}
                    className="bg-primary text-white py-1 rounded-xl w-full"
                >
                    Close
                </button>
            </div>
        </div>
    )
}
