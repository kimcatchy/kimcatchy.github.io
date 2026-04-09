import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SITE_DESCRIPTION } from "@/consts"

interface ProfileProps {
  title: string
}

export function Profile({ title }: ProfileProps) {
  return (
    <div className="group flex flex-col items-center text-center space-y-4 mb-6">
      <div className="relative">
        {/* Glow effect restored and made circular */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-primary/30 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 aspect-square"></div>
        {/* Border removed, shadow-none added, made circular */}
        <Avatar className="w-24 h-24 relative shrink-0 rounded-full overflow-hidden border-0 shadow-none">
          <AvatarImage src={`${import.meta.env.BASE_URL}logo.png`} alt={title} className="object-cover" />
          <AvatarFallback className="rounded-full">B</AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-0.5">
        <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase">{title}</h3>
        <p className="text-xs font-bold text-muted-foreground uppercase leading-none">{SITE_DESCRIPTION}</p>
      </div>
    </div>
  )
}
