import Link from "next/link";

type TakenQuizz = {
  submissionId: number;
  score: number | null;
  quizId: number | null;
  quizName: string | null;
  quizDescription: string | null;
};

type Props = {
  submissions: TakenQuizz[];
};

const TakenQuizzesTable = (props: Props) => {
  return (
    <div className="rounded-md shadow-xl overflow-hidden p-5 border mt-8">
      <h2 className="text-2xl font-bold mb-4">Quizzes I've Taken</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Quiz Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-center">Score</th>
          </tr>
        </thead>
        <tbody>
          {props.submissions.map((sub) => (
            <tr key={sub.submissionId}>
              <td className="border px-4 py-2">
                <Link href={`/quiz/${sub.quizId}`}>
                  <p className="text-blue-600 underline">
                    {sub.quizName || "Unknown Quiz"}
                  </p>
                </Link>
              </td>
              <td className="border px-4 py-2">
                {sub.quizDescription || "No description"}
              </td>
              <td className="border px-4 py-2 text-center font-bold">
                {sub.score !== null ? sub.score : "N/A"}
              </td>
            </tr>
          ))}
          {props.submissions.length === 0 && (
            <tr>
              <td colSpan={3} className="border px-4 py-2 text-center text-gray-500">
                You haven't taken any quizzes yet!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TakenQuizzesTable;
