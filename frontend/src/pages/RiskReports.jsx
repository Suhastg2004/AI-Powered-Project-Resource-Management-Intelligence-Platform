import React from 'react'
import Card from '../components/Card'

const risks = [
  { id: 'r1', title: 'API Stability', score: 78, severity: 'medium' },
  { id: 'r2', title: 'Resource Shortage', score: 92, severity: 'high' }
]

export default function RiskReports() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#3b2413]">Delay Risk Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map(r => (
          <Card key={r.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-[#3b2413]">{r.title}</div>
                <div className="text-sm text-[#7a5a48]">Severity: {r.severity}</div>
              </div>
              <div className="text-xl font-bold text-[#3b2413]">{r.score}</div>
            </div>
            <div className="mt-3 text-sm text-[#7a5a48]">AI Recommendation: Increase staffing and automate tests.</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
