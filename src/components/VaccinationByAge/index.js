import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = ({ageData}) => (
  <>
    <h1>Vaccination by age</h1>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={ageData}
          cx="50%"
          cy="50%"
          labelLine={false}
          fill="#8884d8"
          dataKey="age"
          outerRadius={60}
        >
          <Cell key="18-44" fill="#2d87bb" />
          <Cell key="44-60" fill="#a3df9f" />
          <Cell key="Above60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  </>
)

export default VaccinationByAge
