import { Todo } from "@prisma/client";
import { TODO_STATES_TYPES } from "../utils/todoStates";

const getCardColor = (state: TODO_STATES_TYPES) => {
  switch (state) {
    case "ABANDONED":
      return "bg-red-100";
    case "COMPLETED":
      return "bg-blue-100";
    default:
      return "bg-green-100";
  }
};

export default function TodoCard({
  text,
  state,
}: Pick<Todo, "text"> & { state: TODO_STATES_TYPES }) {
  const loading = false;

  const getActionButtons = () => {
    if (state === "STARTED") {
      return (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {}}
            className="rounded-full bg-mb px-6 py-3 font-semibold no-underline"
          >
            Complete
          </button>
          <button
            onClick={() => {}}
            className="rounded-full bg-red-300 px-6 py-3 font-semibold no-underline"
          >
            Abandon
          </button>
        </div>
      );
    }
  };
  return (
    <div
      className={`${getCardColor(
        state
      )} flex flex-col justify-between gap-4 rounded-lg p-8 transition-all ${
        loading && "pointer-events-none cursor-wait opacity-50"
      }`}
    >
      <p>{text}</p>
      {getActionButtons()}
    </div>
  );
}
