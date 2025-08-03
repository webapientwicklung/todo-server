export type ToDo = {
  id: number;
  text: string;
  isDone: boolean;
  onEdit: boolean;
  dueDate?: string; //YYYY-MM-DD
};
