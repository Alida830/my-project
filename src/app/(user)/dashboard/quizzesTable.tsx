import { quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";

export type Quizz = InferSelectModel<typeof quizzes>;

type Props = {
  quizzes: Quizz[];
};

const QuizzesTable = (props: Props) => {
  return (
    <div className="rounded-md shadow-xl overflow-hidden p-5 border">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
          </tr>
        </thead>

        <tbody>
          {props.quizzes.map((quizz: Quizz) => (
            <tr key={quizz.id}>
              <td className="border px-4 py-2">
                <Link href={`/quiz/${quizz.id}`}>
                  <p className="text-blue-600 underline">
                    {quizz.name}
                  </p>
                </Link>
              </td>

              <td className="border px-4 py-2">
                {quizz.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizzesTable;