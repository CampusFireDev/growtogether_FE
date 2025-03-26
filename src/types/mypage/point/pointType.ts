export interface PointHistory {
    date: string;
    type: "REWARD" | "USE" | "CHARGE";
    amount: string;
}

export interface PointApiResponse {
    availablePoints: number;
    history: PointHistory[];
}