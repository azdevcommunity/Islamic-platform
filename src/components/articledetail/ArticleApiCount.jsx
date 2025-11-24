"use client"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import { apiClient } from "@/lib/api-client"

const ArticleApiCount = () => {
  const { id } = useParams()

  useEffect(() => {
    apiClient.put(`/articles/count/${id}`, null)
      .catch((err) => console.error("Error incrementing article count:", err))
  }, [id])

  return <></>
}

export default ArticleApiCount

