export interface PointHistory {
    date: string;
    type: "REWARD" | "USE" | "CHARGE";
    amount: string;
}