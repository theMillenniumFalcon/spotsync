import type { Metadata } from "next"

import NotFound from "@/components/notFound"

export const metadata: Metadata = {
    title: "404",
    description: "Not found",
  };

export default function NotFoundPage() {
    return <NotFound />
}