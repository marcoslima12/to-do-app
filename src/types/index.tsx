export type TaskInputType = {
    title: string;
    desc?: string | undefined;
    deadline: Date;
}

export type UserType = {
    email: string;
    fullname: string;
}