export interface GameScore {
    points: number;
}

export interface Team {
    id: number;
    name: string;
    nickname: string;
    logo: string;
    scores: GameScore;
}

export interface Game {
    id: number;
    teams: {
        visitors: Team;
        home: Team;
    };
    scores: {
        visitors: GameScore;
        home: GameScore;
    };
}

export interface ApiResponse {
    response: Game[];
}
