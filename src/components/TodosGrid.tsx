import { api } from "../utils/api";
import { TODO_STATES_TYPES } from "../utils/todoStates";
import TodoCard from "./TodoCard";

export default function TodosGrid() {
  const { data, isLoading, isError } = api.todo.getTodos.useQuery();

  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (isError) {
    return <p className="text-red-400">Oh no! Couldn't load todos</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      {data.map(({ id, text, state }) => (
        <TodoCard key={id} text={text} state={state as TODO_STATES_TYPES} />
      ))}
    </div>
  );
}
