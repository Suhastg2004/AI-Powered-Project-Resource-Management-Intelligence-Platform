import React from 'react'
import Card from '../components/Card'
import { users } from '../data/users'

export default function Resources() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#3b2413]">Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map(u => (
          <Card key={u.id}>
            <div className="font-semibold text-[#3b2413]">{u.name}</div>
            <div className="text-sm text-[#7a5a48]">{u.role}</div>
            <div className="mt-2">
              <div className="text-sm text-[#7a5a48]">Utilization</div>
              <div className="w-full bg-[#ffe9da] rounded h-3 mt-1">
                <div className="bg-accent h-3 rounded" style={{ width: `${u.utilization}%` }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
