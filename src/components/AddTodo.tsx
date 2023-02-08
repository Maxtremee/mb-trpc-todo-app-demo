import { FormEvent, useState } from "react";
import { api } from "../utils/api";

export default function AddTodo() {
  const [text, setText] = useState("");

  const { isLoading, mutate } = api.todo.addTodo.useMutation();

  const submit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    mutate(
      {
        text,
      },
      {
        onSuccess: () => {
          setText("");
        },
      }
    );
  };

  return (
    <form className="flex w-1/2 flex-col gap-2" onSubmit={submit}>
      <label htmlFor="new" className="text-xl">
        Add new todo
      </label>
      <input
        className="h-12 rounded-sm border-solid border-gray-300 text-xl"
        id="new"
        placeholder="What do You have to do?"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        type="submit"
        className={`w-40 rounded-full bg-mb px-10 py-3 font-semibold no-underline ${
          (text.length < 1 || isLoading) && "pointer-events-none bg-gray-300"
        }`}
      >
        {isLoading ? "Loading..." : "Add todo"}
      </button>
    </form>
  );
}
