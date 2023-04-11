import { ApplicationError } from "@/protocols";

export function timeConflictError(message: string): ApplicationError {
  return {
    name: "TimeConflictError",
    message,
  };
}
