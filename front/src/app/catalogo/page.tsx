import { CarList } from "@/components/CarList"

function page() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          filtros
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12"><CarList/></div>
      </div>
  )
}

export default page