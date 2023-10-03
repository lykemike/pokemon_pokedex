'use client';
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

export default function PokemonStats({ stats }: any) {
  const trimLabel = (label: any) =>
    label.length > 10 ? `${label.substring(0, 10)}...` : label;

  return (
    <ResponsiveContainer width='100%' height={200}>
      <BarChart
        data={stats}
        layout='vertical'
        margin={{ top: 5, right: 50, left: 5, bottom: 5 }}
      >
        <XAxis
          dataKey='base_stat'
          type='number'
          stroke='#888888'
          fontSize={14}
          tickLine={false}
          axisLine={false}
          hide={true}
          //   tickFormatter={(value) => `$${value}`}
        />
        <YAxis
          dataKey='stat_name'
          type='category'
          stroke='#888888'
          fontSize={14}
          width={120}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey='base_stat' fill='#a5cee0' radius={[10, 10, 10, 10]}>
          <LabelList
            dataKey='base_stat'
            position='right'
            formatter={trimLabel}
            fill='#5e5e5e'
            fontSize='12px'
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
