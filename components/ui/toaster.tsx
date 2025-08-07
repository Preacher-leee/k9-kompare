'use client'

import { useToasts } from '@/context/store'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

export function Toaster() {
  const { toasts, removeToast } = useToasts()

  useEffect(() => {
    // Auto-remove toasts after their duration
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          removeToast(toast.id)
        }, toast.duration)

        return () => clearTimeout(timer)
      }
    })
  }, [toasts, removeToast])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-3 rounded-lg border bg-background p-4 shadow-lg animate-slide-in-from-top',
            {
              'border-success/20 bg-success/10': toast.type === 'success',
              'border-destructive/20 bg-destructive/10': toast.type === 'error',
              'border-warning/20 bg-warning/10': toast.type === 'warning',
              'border-primary/20 bg-primary/10': toast.type === 'info',
            }
          )}
        >
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{toast.title}</h4>
            {toast.message && (
              <p className="text-sm text-muted-foreground mt-1">
                {toast.message}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeToast(toast.id)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
} 
