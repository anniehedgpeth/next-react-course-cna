import Image from "next/image";
import Link from "next/link";
import sql from "@/lib/database";
import QuizForm from "./quiz-form";
// const sql = postgres(process.env.DATABASE_URL!);

type Quiz = {
  quiz_id: number;
  title: string;
};

async function Quizzes() {
  const quizzes: Quiz[] = await sql`SELECT * FROM quizzes`;
  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.quiz_id}>
          <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl text-blue-900 font-semibold">All Quizzes</h1>
      <Quizzes />
      <QuizForm />
    </section>
  );
}
