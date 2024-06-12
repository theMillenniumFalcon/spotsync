import Sidebar from "@/components/sidebar";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="dashboard-scroll flex h-full overflow-x-auto">
        <Sidebar editing={false} />
        {/* <div className="w-96 text-xs text-zinc-500">{JSON.stringify(data)}</div> */}
        {/* <PlaylistSelect /> */}
      </div>
    </div>
  )
}
