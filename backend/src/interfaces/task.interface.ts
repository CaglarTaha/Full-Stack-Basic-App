interface TaskInput {
    task:string;
    name: string;
  }

  interface TaskOutput {
    id: number;
    name: string;
    task: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export { TaskInput, TaskOutput };
