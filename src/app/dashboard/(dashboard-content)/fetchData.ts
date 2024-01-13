import { headers } from "next/headers";

export default async function fetchData() {
    try {
        let res = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard`
            , { headers: headers()}
        )
        const apiResponse:any = await res.json()
        return apiResponse
    } catch (error) {
         console.log('unable to get Data',error)
    }
}