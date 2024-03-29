import { cookies, headers } from "next/headers";

interface Customer {
    _id: string;
    currentCycle: {
        _id: string,
        name: string,
        target_amt: number
    };
    cyclePurchase: number;
    reward: number;
    cycleStartDate: string,
    cycleEndDate: string;
}

interface Level {
    _id: string;
    name: string;
    target_amt: number;
    reward_percentage: number;
}
interface Purchase {
    amount: number;
    purchase_date: string;
    addedBy: {
        username: string
    };
    createdAt: string

}

interface DataProps {
    customer: Customer;
    level: Level[];
    purchase: Purchase[];
}

export default async function fetchData() {   

    try {
        let res = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard`
            , {
                headers : new Headers(headers())
            }
        )
        const apiResponse: DataProps = await res.json()
        return apiResponse
    } catch (error) {
        throw new Error("unable to get data");
    }
}