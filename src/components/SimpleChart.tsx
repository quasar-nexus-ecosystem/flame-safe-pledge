'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DataPoint {
  date: string
  count: number
}

interface SimpleChartProps {
  data: DataPoint[]
  title: string
  color?: string
  height?: number
  className?: string
}

export function SimpleChart({ 
  data, 
  title, 
  color = '#f36d21', 
  height = 200, 
  className = '' 
}: SimpleChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700 ${className}`}>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          <p>No data available</p>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.count))
  const minValue = Math.min(...data.map(d => d.count))
  const range = maxValue - minValue || 1

  return (
    <div className={`bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-flame-500">{title}</h3>
      
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 h-full relative">
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Chart line */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d={
                data.map((point, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = 100 - (((point.count - minValue) / range) * 100)
                  return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`
                }).join(' ')
              }
              fill="none"
              stroke={color}
              strokeWidth="3"
              className="drop-shadow-lg"
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - (((point.count - minValue) / range) * 100)
              
              return (
                <motion.g key={index}>
                  {/* Glow effect */}
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="8"
                    fill={color}
                    opacity="0.3"
                    className="animate-pulse"
                  />
                  {/* Main point */}
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-6 transition-all"
                  />
                  
                  {/* Tooltip on hover */}
                  <foreignObject
                    x={`${x}%`}
                    y={`${y}%`}
                    width="1"
                    height="1"
                    className="overflow-visible pointer-events-none"
                  >
                    <div className="group relative">
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <div className="font-semibold">{point.count} signatures</div>
                        <div className="text-gray-300">{new Date(point.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </foreignObject>
                </motion.g>
              )
            })}
            
            {/* Gradient fill under line */}
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              d={
                data.map((point, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = 100 - (((point.count - minValue) / range) * 100)
                  return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`
                }).join(' ') + ` L 100% 100% L 0% 100% Z`
              }
              fill={`url(#gradient-${title.replace(/\s+/g, '-')})`}
            />
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="ml-8 mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{new Date(data[0]?.date).toLocaleDateString()}</span>
          <span>Now</span>
        </div>
      </div>
      
      {/* Stats summary */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-2 bg-slate-700/30 rounded">
          <div className="text-sm font-bold" style={{ color }}>{maxValue}</div>
          <div className="text-xs text-muted-foreground">Peak</div>
        </div>
        <div className="p-2 bg-slate-700/30 rounded">
          <div className="text-sm font-bold" style={{ color }}>
            {Math.round(data.reduce((sum, d) => sum + d.count, 0) / data.length)}
          </div>
          <div className="text-xs text-muted-foreground">Average</div>
        </div>
        <div className="p-2 bg-slate-700/30 rounded">
          <div className="text-sm font-bold" style={{ color }}>
            {data[data.length - 1]?.count || 0}
          </div>
          <div className="text-xs text-muted-foreground">Latest</div>
        </div>
      </div>
    </div>
  )
} 