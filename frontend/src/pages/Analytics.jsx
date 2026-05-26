import React from 'react'
import Card from '../components/Card'
import { analytics } from '../data/analytics'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'

export default function Analytics() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Analytics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h4 className="font-semibold mb-2">Sprint Velocity</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.sprintVelocity}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip />
              <Bar dataKey="points" fill="var(--accent)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h4 className="font-semibold mb-2">Delay Trends</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analytics.delays}>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip />
              <Line dataKey="value" stroke="var(--accent-2)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
