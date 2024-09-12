'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { updateTask } from "@/lib/actions"

export function TaskActions({ task }: { task: any }) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async () => {
    setIsUpdating(true)
    await updateTask(task.id, { completed: !task.completed })
    setIsUpdating(false)
  }

  const handlePriorityChange = async (newPriority: string) => {
    setIsUpdating(true)
    await updateTask(task.id, { priority: newPriority })
    setIsUpdating(false)
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleStatusChange}
        disabled={isUpdating}
      >
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </Button>
      <select
        value={task.priority}
        onChange={(e) => handlePriorityChange(e.target.value)}
        disabled={isUpdating}
        className="border rounded px-2 py-1"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  )
}