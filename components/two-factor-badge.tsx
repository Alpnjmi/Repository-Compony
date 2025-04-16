import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

interface TwoFactorBadgeProps {
  enabled: boolean
}

export function TwoFactorBadge({ enabled }: TwoFactorBadgeProps) {
  if (!enabled) return null

  return (
    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
      <Shield className="h-3 w-3" />
      2FA
    </Badge>
  )
}
