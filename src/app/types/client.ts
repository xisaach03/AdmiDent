
import { Treatment } from "./treatment";

export interface Client {
        name: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        gender: string;
        birthday: string;
        age: number;
        occupation: string;
        hobbies: string;
        emergencyContact: string;
        Treatments: Treatment[];
}
