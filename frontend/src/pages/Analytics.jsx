import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { api } from '../services/api'
import axios from 'axios'
import { 
  ResponsiveContainer, 
  LineChart, Line, 
  BarChart, Bar, 
  ScatterChart, Scatter, ZAxis, Cell,
  XAxis, YAxis, Tooltip 
} from 'recharts'

export default function Analytics() {
  const [sprints, setSprints] = useState([])
  const [projects, setProjects] = useState([])
  const [utilization, setUtilization] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setMessage('')
    try {
      // 1. Fetch standard data from Spring Boot API
      const [sprintData, projectData] = await Promise.all([
        api.get('/sprints'), 
        api.get('/projects')
      ])
      
      setSprints(sprintData)
      setProjects(projectData)

      // 2. Fetch utilization data directly from Python ML Service
      try {
        const utilRes = await axios.get('http://13.207.55.199:8000/analytics/developer-utilization')
        setUtilization(utilRes.data)
      } catch (pythonErr) {
        console.warn("Python service not reachable for utilization data:", pythonErr)
        // Fallback dummy data if Python service isn't running yet
        setUtilization([
          { sprint_name: 'Sprint 1', developer_name: 'Alice', utilization_pct: 95 },
          { sprint_name: 'Sprint 1', developer_name: 'Bob', utilization_pct: 60 },
          { sprint_name: 'Sprint 2', developer_name: 'Alice', utilization_pct: 85 }
        ])
      }

    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const velocityData = sprints.map(sprint => ({ name: sprint.sprintName, points: sprint.velocity || 0 }))
  const delayData = projects.map((project, index) => ({ month: `P${index + 1}`, value: project.delayRiskScore || 0 }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Analytics</h3>
      </div>

      {message && (
        <Card style={{ background: 'var(--surface-strong)', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text)' }}>{message}</p>
        </Card>
      )}

      {loading ? (
        <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text)' }}>Loading analytics...</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Chart 1: Sprint Velocity */}
          <Card>
            <h4 className="font-semibold mb-2">Sprint Velocity</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={velocityData.length ? velocityData : [{ name: 'No data', points: 0 }] }>
                <XAxis dataKey="name" tick={{ fill: 'var(--muted)' }} />
                <YAxis tick={{ fill: 'var(--muted)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg)', borderRadius: 12, borderColor: 'var(--border)' }} />
                <Bar dataKey="points" fill="var(--accent)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 2: Delay Trend */}
          <Card>
            <h4 className="font-semibold mb-2">Delay Trend</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={delayData.length ? delayData : [{ month: 'No data', value: 0 }] }>
                <XAxis dataKey="month" tick={{ fill: 'var(--muted)' }} />
                <YAxis tick={{ fill: 'var(--muted)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg)', borderRadius: 12, borderColor: 'var(--border)' }} />
                <Line type="monotone" dataKey="value" stroke="var(--accent-2)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 3: Developer Utilization Heatmap (New!) */}
          <Card className="lg:col-span-2">
            <h4 className="font-semibold mb-2">Developer Utilization Heatmap</h4>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Size and color indicate workload intensity. Red indicates potential burnout ({'>'}90%).
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="category" dataKey="sprint_name" name="Sprint" tick={{ fill: 'var(--muted)' }} />
                <YAxis type="category" dataKey="developer_name" name="Developer" tick={{ fill: 'var(--muted)' }} width={80} />
                <ZAxis type="number" dataKey="utilization_pct" name="Utilization %" range={[100, 800]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: 'var(--bg)', borderRadius: 12, borderColor: 'var(--border)' }}
                />
                <Scatter data={utilization.length ? utilization : [{ sprint_name: 'No data', developer_name: 'None', utilization_pct: 0 }]}>
                  {utilization.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.utilization_pct > 90 ? '#ef4444' : 'var(--accent)'} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </Card>

        </div>
      )}
    </div>
  )
}