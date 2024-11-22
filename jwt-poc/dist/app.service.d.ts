export type User = {
    id: number;
    nome: string;
    email: string;
};
export declare class AppService {
    getUsers(): User[];
    getUser(email: string): User;
}
