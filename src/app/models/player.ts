
export class Player {
    id: number;
    firstName: string;
    lastName: string;
    team: string;

    constructor(id: number, firstName: string, lastName: string, team: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
    }
}