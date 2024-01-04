import { headers } from "next/headers";

interface RewardProps {
    _id: string;
    user: { username: string; email: string };
    currentCycle: {
        _id:string,
        name:string
    };
    cyclePurchase: number;
    reward: number;
    cycleStartDate: string;
    cycleEndDate: string;
}

interface DataProps {
    rewards: RewardProps[];
}

const fetchReward = async () => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reward`, {
            headers: headers()
        });

        const ApiResponse: DataProps = await res.json();
        return ApiResponse;
    } catch (error) {
        throw new Error("Unable to get Records");
    }
};

export default fetchReward;
