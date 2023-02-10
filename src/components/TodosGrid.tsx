import { api } from "../utils/api";
import { TODO_STATES_TYPES } from "../utils/todoStates";
import TodoCard from "./TodoCard";

export default function TodosGrid() {
  const { data, isLoading, isError, isFetching } = api.todo.getTodos.useQuery();

  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (isError) {
    return <p className="text-red-400">Oh no! Couldn't load todos</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {isFetching && <p>Fetching...</p>}
      <p className="text-xl font-semibold">Started</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {data
          .filter(({ state }) => state === "STARTED")
          .map(({ id, text, state }) => (
            <TodoCard
              key={id}
              id={id}
              text={text}
              state={state as TODO_STATES_TYPES}
            />
          ))}
      </div>
      <p className="text-xl font-semibold">Completed</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {data
          .filter(({ state }) => state === "COMPLETED")
          .map(({ id, text, state }) => (
            <TodoCard
              key={id}
              id={id}
              text={text}
              state={state as TODO_STATES_TYPES}
            />
          ))}
      </div>
      <p className="text-xl font-semibold">Abandoned</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {data
          .filter(({ state }) => state === "ABANDONED")
          .map(({ id, text, state }) => (
            <TodoCard
              key={id}
              id={id}
              text={text}
              state={state as TODO_STATES_TYPES}
            />
          ))}
      </div>
    </div>
  );
}
