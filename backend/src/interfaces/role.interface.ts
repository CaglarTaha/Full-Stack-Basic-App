interface RoleInput {
    name: string;
  }

  interface RoleOutput {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export { RoleInput, RoleOutput };
