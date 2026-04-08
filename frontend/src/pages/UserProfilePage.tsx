import type { JSX } from 'react'
import ProfileUser from '../components/user/ProfileUser'
export default function UserProfilePage(): JSX.Element {
  return (
    <div className="grid w-full grid-cols-2 gap-8 px-16 py-8">
      <aside className="">
        <ProfileUser />
      </aside>
      <section className="px-8">
        <div className="relative mt-4 h-full rounded-md border border-amber-100 bg-amber-50 p-4 shadow-md shadow-amber-100">
          <h3 className="absolute -top-6 text-center font-bold tracking-wide text-amber-900">
            Historial de reservas
          </h3>
          <h4 className="rounded-md bg-amber-100 p-4 text-xl font-medium text-amber-900/70">
            Sin reserva de vehículos
          </h4>
        </div>
      </section>
    </div>
  )
}
