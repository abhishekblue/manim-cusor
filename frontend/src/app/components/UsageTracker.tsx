import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from '@clerk/nextjs';

export default function UsageTracker() {
    const [used, setUsed] = useState()
    const [limit, setLimit] = useState()
    const [loading, setLoading] = useState(true)
    const {isSignedIn} = useAuth()

    useEffect(() => {
    const getUsage = async () => {
        try {
        const { data } = await axios.get("https://api.renderconcepts.com/usage", {
            headers: {
            "x-auth": isSignedIn ? 'true' : 'false',
            },
        });
        setLimit(data.limit)
        setUsed(data.used)
        console.log(used, limit)
        } catch (error) {
            console.error(error)
        } finally {
        setLoading(false)
        }
    }
    getUsage()
    }, [used, limit, isSignedIn])
    return (
    <div className="text-right">
    {loading ? (
      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
    ) : used === null || limit === null ? (
      <div>Failed to load usage data</div>
    ) : (
      <div className="place-items-center">
        <div>Credits: {limit! - used!}<span className="text-xs text-gray-400"> ( Will be adding DB soon. Till then credits wont update. )</span> </div>
      </div>
    )}
  </div>
    )
}
