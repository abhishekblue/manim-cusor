import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useUser } from '@clerk/nextjs';
const backendAPI = process.env.NEXT_PUBLIC_API_BASE!;

export default function UsageTracker({ trigger, onCreditExhausted }: { trigger: number, onCreditExhausted?: () => void }) {
    const [used, setUsed] = useState()
    const [limit, setLimit] = useState()
    const [loading, setLoading] = useState(true)
    const { isSignedIn, user } = useUser();
    const prevRemaining = useRef<number | null>(null);
    const hasTriggeredPopup = useRef(false);
    
    useEffect(() => {
      if (isSignedIn && user?.id) {
        axios.post(`${backendAPI}/signup`, null, {
          headers: {
            "x-user-id": user.id,
          },
        }).catch((err) => {
          console.error("Signup sync failed:", err);
        });
      }
  }, [isSignedIn, user?.id]);

    useEffect(() => {
    const getUsage = async () => {
        try {
        const { data } = await axios.get(`${backendAPI}/usage`, {
            headers: {
            "x-auth": isSignedIn ? 'true' : 'false',
            },
        });
        const currentRemaining = data.limit - data.used;
        if (currentRemaining === 0 && !hasTriggeredPopup.current) {
          hasTriggeredPopup.current = true;
          onCreditExhausted?.();
        }
        prevRemaining.current = currentRemaining;

        setLimit(data.limit)
        setUsed(data.used)
        } catch (error) {
            console.error(error)
        } finally {
        setLoading(false)
        }
    }
    getUsage()
    }, [isSignedIn, trigger, onCreditExhausted])

    return (
    <div className="text-right">
    {loading ? (
      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
    ) : used === null || limit === null ? (
      <div>Failed to load usage data</div>
    ) : (
      <div className="place-items-center">
        <div>Credits: {limit! - used!}</div>
      </div>
    )}
  </div>
    )
}
