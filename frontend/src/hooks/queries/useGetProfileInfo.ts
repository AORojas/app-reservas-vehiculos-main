import { getProfileInfo } from '@/api/userApi'
import type { UserProfileInfo } from '@/types/types'
import { useState } from 'react'

interface useGetProfileInfoReturn {
  userProfileInfo: UserProfileInfo | null
  error: string | null
  loading: boolean
  fetchProfileInfo: (id: string) => Promise<void>
}

const useGetProfileInfo = (): useGetProfileInfoReturn => {
  const [userProfileInfo, setUserProfileInfo] =
    useState<UserProfileInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfileInfo = async (id: string): Promise<void> => {
    try {
      const data = await getProfileInfo(id)

      setUserProfileInfo(data.userProfileInfo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    } finally {
      setLoading(false)
    }
  }

  return { userProfileInfo, loading, error, fetchProfileInfo }
}

export default useGetProfileInfo
