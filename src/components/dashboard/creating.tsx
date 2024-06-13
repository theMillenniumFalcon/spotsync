import { Loader2 } from "lucide-react"

interface CreatingProps {
    name: string
}

const Creating: React.FC<CreatingProps> = ({ name }) => {
  return (
    <div>
      <Loader2 className="mt-4 h-8 w-8 animate-spin animate-pulse self-center text-zinc-500" />

      <div className="mt-4 mb-8 text-sm">
        Creating a live editing room for{" "}
        <span className="font-bold underline underline-offset-2">{name}</span>
      </div>
    </div>
  )
}

export default Creating
