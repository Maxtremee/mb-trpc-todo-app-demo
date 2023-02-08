import { Todo } from "@prisma/client";
import { api } from "../utils/api";
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
  id,
}: Pick<Todo, "text" | "id"> & { state: TODO_STATES_TYPES }) {
  const utils = api.useContext();
  const { isLoading, mutate } = api.todo.updateTodo.useMutation({
    onSuccess: () => {
      utils.todo.getCount.refetch();
      utils.todo.getTodos.refetch();
    },
  });

  const completeTodo = () => {
    mutate({
      id,
      state: "COMPLETED",
    });
  };

  const abandonTodo = () => {
    mutate({
      id,
      state: "ABANDONED",
    });
  };

  const getActionButtons = () => {
    if (state === "STARTED") {
      return (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={completeTodo}
            className="rounded-full bg-mb px-6 py-3 font-semibold no-underline"
          >
            Complete
          </button>
          <button
            onClick={abandonTodo}
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
        isLoading && "pointer-events-none cursor-wait opacity-50"
      }`}
    >
      <p>{text}</p>
      {getActionButtons()}
    </div>
  );
}
