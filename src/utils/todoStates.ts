export const TODO_STATES = ["STARTED", "COMPLETED", "ABANDONED"] as const;
export type TODO_STATES_TYPES = (typeof TODO_STATES)[number];
