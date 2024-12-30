export interface initialStateTypes {
  loading: boolean;
  error: string;
  list: SingleTodo[];
  singleTodo: SingleTodo;
}
interface SingleTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
