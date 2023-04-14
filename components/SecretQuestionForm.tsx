import { cn } from '@/lib/helpers';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const SECRET_QUESTIONS = [
  'What was your childhood nickname?',
  'What was the name of your first pet?',
  'What was the name of the first school you attended?',
  "What is your mother's maiden name?",
  'In which city were you born?',
  'What is the name of your favorite teacher?',
  'What was the make and model of your first car?',
  'What is the name of the street where you grew up?',
  'What is the name of your favorite book?',
  'What is the name of your favorite childhood toy?',
  'What is your favorite color?',
  "What is your father's middle name?",
  'What was the first concert you attended?',
  'What is the name of your favorite sports team?',
];

// function to verify if items in an array are unique
const isUnique = (arr: string[]) => {
  const filtered_arr = arr.filter((item) => item !== '');
  if (filtered_arr.length <= 1) return true;
  const set = new Set(filtered_arr);
  return set.size === filtered_arr.length;
};

// function to check if some items in an array are empty
const hasEmpty = (arr: string[]) => {
  return arr.some((item) => item === '');
};

export default function SecretQuestionForm({
  setHasSecretQuestions,
}: {
  setHasSecretQuestions: (hasSecretQuestions: boolean) => void;
}) {
  const [questions, setQuestions] = useState(['', '', '']);
  const [answers, setAnswers] = useState(['', '', '']);
  const [duplicateQuestions, setDuplicateQuestions] = useState(false);
  const [duplicateAnswers, setDuplicateAnswers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if questions are unique
    setDuplicateQuestions(!isUnique(questions));

    // Check if answers are unique
    setDuplicateAnswers(!isUnique(answers));
  }, [questions, answers]);

  const handleChangeQuestion = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const q = questions;
    q[index] = e.target.value;
    setQuestions([...q]);
  };

  const handleChangeAnswer = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const a = answers;
    a[index] = e.target.value;
    setAnswers([...a]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    // Handle submission logic here
    // console.log('Questions:', questions);
    // console.log('Answers:', answers);
    const post_data = {
      q1: questions[0],
      q2: questions[1],
      q3: questions[2],
      a1: answers[0],
      a2: answers[1],
      a3: answers[2],
    };

    // POST to API
    // const response = await fetch('/api/set-secret-questions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(post_data),
    // });

    // if (!response.ok) {
    //   setLoading(false);
    //   throw new Error(response.statusText);
    // }

    // const data = await response.json();
    // console.log(data);
    // if (data.message === 'Success') {
    //   setLoading(false);
    //   alert('Success!');
    // }
    const fetcher = fetch('/api/set-secret-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_data),
    });
    toast.promise(fetcher, {
      loading: 'Setting secret questions...',
      success: () => {
        setLoading(false);
        setHasSecretQuestions(true);
        return 'Success!';
      },
      error: 'Error setting secret questions',
    });
  };

  const renderQuestionForm = (index: number) => (
    <div className="mb-4" key={`question-form-${index}`}>
      <label className="block mb-2">
        Secret Question {index + 1}:
        <select
          value={questions[index]}
          onChange={(e) => handleChangeQuestion(e, index)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a question</option>
          {SECRET_QUESTIONS.map((question) => (
            <option key={question} value={question}>
              {question}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        Answer {index + 1}:
        <input
          type="text"
          value={answers[index]}
          onChange={(e) => handleChangeAnswer(e, index)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
      </label>
    </div>
  );

  return (
    <>
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl mb-6">Set your secret questions</h1>
        <form onSubmit={handleSubmit}>
          {[0, 1, 2].map((index) => renderQuestionForm(index))}
          <button
            disabled={
              duplicateQuestions || hasEmpty(questions) || hasEmpty(answers)
            }
            type="submit"
            className={cn('btn btn-primary', loading && 'loading')}
          >
            {loading ? 'Loading' : `Submit`}
          </button>
        </form>

        {duplicateQuestions && (
          <p className="text-warning mt-4">
            You have duplicate questions. Please select unique questions.
          </p>
        )}

        {duplicateAnswers && (
          <p className="text-warning mt-4">
            You have duplicate answers. Please input unique answers.
          </p>
        )}
      </div>
    </>
  );
}