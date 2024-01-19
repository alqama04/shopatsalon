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

interface DataResp {
    rewards: RewardProps[];
}

interface fetchRewardProp{
    page:number,
    limit?:number,
    phone:string,
    email:string,
}

const fetchReward = async ({page,limit,phone,email}:fetchRewardProp) => {
 
    
    let queryStr = `page=${page}&limit=${limit}${phone ?`&phone=${phone}`:''}${email ? `&email=${email}`:''}`;
  

    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reward?${queryStr}`, {
            headers : new Headers(headers()),
        });

        const ApiResponse: DataResp = await res.json();
        return ApiResponse;
    } catch (error) {
        console.log(error)
    }
};

export default fetchReward;
