"use client"

import { useMachineStore } from '@/store/machineStore'

export default function WashingMachinePage() {
  const { machines, reportMalfunction } = useMachineStore()

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-2xl font-bold mb-6">세탁기/건조기 현황</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {machines.map(machine => (
          <div 
            key={machine.id}
            className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{machine.type} #{machine.id}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                machine.status === '사용 가능' ? 'bg-green-100 text-green-800' :
                machine.status === '사용 중' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {machine.status}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              위치: {machine.location}
            </p>
            
            {machine.timeRemaining && (
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                남은 시간: {machine.timeRemaining}분
              </p>
            )}
            
            {machine.status !== '고장' && (
              <button
                onClick={() => reportMalfunction(machine.id)}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
              >
                고장 신고
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
