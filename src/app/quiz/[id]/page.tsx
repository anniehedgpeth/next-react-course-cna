import sql from "@/lib/database";
import { redirect } from "next/navigation";

async function Quiz({
  id,
  searchParams,
}: {
  id: string;
  searchParams: { isQuizCorrect?: string };
}) {
  const answers = await sql`
    SELECT
      q.quiz_id,
      q.title AS quiz_title,
      q.description AS quiz_description,
      q.question_text AS quiz_question,
      a.answer_id,
      a.answer_text,
      a.is_correct
    FROM quizzes AS q
    JOIN answers AS a ON q.quiz_id = a.quiz_id
    WHERE q.quiz_id = ${id}`;

  return (
    <div>
      <h1 className="text-2xl">{answers[0].quiz_title}</h1>
      <h1 className="text-2xl text-gray-700">{answers[0].quiz_description}</h1>
      <h1 className="text-xl my-4">{answers[0].quiz_question}</h1>
      <ul>
        {answers.map((answer, key) => (
          <li key={answer.answer_id}>
            <p>
              <input type="checkbox" name={`answer-${key + 1}`}></input>
              <input
                type="hidden"
                name={`isCorrect-answer-${key + 1}`}
                value={answer.is_correct}
              />
              <label>
                {answer.answer_text}
                {searchParams.isQuizCorrect && answer.is_correct && " ✅"}{" "}
              </label>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function QuizPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { isQuizCorrect?: string };
}) {
  async function checkAnswer(formData: FormData) {
    "use server";
    console.log(JSON.stringify(formData.entries(), null, " "));
    let isQuizCorrect = true;
    [1, 2, 3].map((id) => {
      const isCorrect = formData.get(`isCorrect-answer-${id}`) === "true";
      const isChecked = formData.get(`answer-${id}`) === "on";
      console.log(
        `ID: ${id}, isCorrect: ${isCorrect}, isChecked: ${isChecked}`
      );
      if ((isChecked && !isCorrect) || (!isChecked && isCorrect)) {
        isQuizCorrect = false;
      }
    });

    redirect(`/quiz/${params.id}?isQuizCorrect=${isQuizCorrect}`);
  }
  return (
    <section>
      <form action={checkAnswer}>
        <Quiz id={params.id} searchParams={searchParams} />
        <button className="bg-gray-200 p-2 m-2 rounded hover:bg-gray-300 transition-all">
          Check Answer
        </button>
      </form>

      {searchParams.isQuizCorrect === "true" && <p>Good job!</p>}
      {searchParams.isQuizCorrect === "false" && <p>Incorrect</p>}
    </section>
  );
}
