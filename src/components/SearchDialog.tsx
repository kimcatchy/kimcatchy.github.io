"use client"

import * as React from "react"
import { SearchIcon, FileTextIcon, FolderIcon, HashIcon, CornerDownLeftIcon } from "lucide-react"
import Fuse from "fuse.js"
import { Command as CommandPrimitive } from "cmdk"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useSidebar } from "@/components/ui/sidebar"

type SearchResult = {
  title: string
  description: string
  tags: string[]
  url: string
  body: string
  type: "Blog" | "Project"
}

export function SearchTrigger() {
  const { setOpenMobile } = useSidebar()

  const handleOpen = () => {
    setOpenMobile(false)
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-search-dialog"))
    }, 150)
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-start text-muted-foreground bg-secondary/20 border-border/40 hover:bg-secondary/40 rounded-md! h-9 px-3"
      onClick={handleOpen}
    >
      <SearchIcon className="size-4 mr-2.5 shrink-0 opacity-50" />
      <span className="text-xs font-black uppercase tracking-tight flex-1 text-left">Search</span>
      <div className="hidden md:flex items-center gap-1">
        <kbd className="h-5 inline-flex items-center rounded border border-border/40 bg-background px-1.5 font-mono text-[10px] font-medium opacity-60">
          Ctrl
        </kbd>
        <span className="text-[10px]">+</span>
        <kbd className="h-5 inline-flex items-center rounded border border-border/40 bg-background px-1.5 font-mono text-[10px] font-medium opacity-60">
          K
        </kbd>
      </div>
    </Button>
  )
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [data, setData] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const handleOpenEvent = () => setOpen(true)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("open-search-dialog", handleOpenEvent)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("open-search-dialog", handleOpenEvent)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  React.useEffect(() => {
    if (open && data.length === 0 && !loading) {
      setLoading(true)
      fetch(`${import.meta.env.BASE_URL}api/search.json`)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [open, data.length, loading])

  const results = React.useMemo(() => {
    if (!query) return data.slice(0, 10)
    const fuse = new Fuse(data, {
      keys: [
        { name: "title", weight: 1 },
        { name: "tags", weight: 0.8 },
        { name: "description", weight: 0.6 },
        { name: "body", weight: 0.4 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
    })
    return fuse.search(query).map(r => r.item).slice(0, 30)
  }, [query, data])

  const blogs = results.filter(item => item.type === "Blog")
  const projects = results.filter(item => item.type === "Project")

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="z-[100] sm:max-w-xl"
    >
      <Command shouldFilter={false} className="rounded-md! bg-popover">
        <div className="flex items-center px-4 border-b border-border/40 bg-popover">
          <SearchIcon className="size-5 shrink-0 text-muted-foreground/50 mr-3" />
          <CommandPrimitive.Input
            placeholder="Search anything..."
            value={query}
            onValueChange={setQuery}
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-base font-medium outline-none placeholder:text-muted-foreground/40"
          />
        </div>

        <CommandList className="h-[min(480px,50vh)] sm:max-h-[500px] overflow-y-auto scrollbar-thin bg-popover px-2 pt-0 pb-2">
          {loading && (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-muted-foreground/40 text-center">
              <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Indexing Content...</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <CommandEmpty className="py-24 text-center">
              <div className="inline-flex p-4 rounded-full bg-muted/20 mb-4 text-muted-foreground/20">
                <SearchIcon size={32} />
              </div>
              <p className="text-sm font-black text-foreground uppercase tracking-tight">No Matches Found</p>
            </CommandEmpty>
          )}

          {!loading && results.length > 0 && (
            <>
              {blogs.length > 0 && (
                <CommandGroup
                  heading="Blog Posts"
                  className="p-0 **:[[cmdk-group-heading]]:sticky **:[[cmdk-group-heading]]:top-0 **:[[cmdk-group-heading]]:z-10 **:[[cmdk-group-heading]]:bg-popover **:[[cmdk-group-heading]]:font-black **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:text-primary **:[[cmdk-group-heading]]:tracking-tight **:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-1.5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:border-b **:[[cmdk-group-heading]]:border-border/5"
                >
                  {blogs.map(item => (
                    <SearchItem key={item.url} item={item} onSelect={() => { window.location.href = item.url; setOpen(false); }} />
                  ))}
                </CommandGroup>
              )}
              {projects.length > 0 && (
                <CommandGroup
                  heading="Projects"
                  className="p-0 **:[[cmdk-group-heading]]:sticky **:[[cmdk-group-heading]]:top-0 **:[[cmdk-group-heading]]:z-10 **:[[cmdk-group-heading]]:bg-popover **:[[cmdk-group-heading]]:font-black **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:text-primary **:[[cmdk-group-heading]]:tracking-tight **:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-1.5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:border-b **:[[cmdk-group-heading]]:border-border/5"
                >
                  {projects.map(item => (
                    <SearchItem key={item.url} item={item} onSelect={() => { window.location.href = item.url; setOpen(false); }} />
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>

        <div className="flex items-center justify-between px-5 py-3 border-t border-border/40 bg-secondary/10 shrink-0">
          <div className="flex items-center gap-6 text-[10px] font-black text-muted-foreground/40 uppercase tracking-tight">
            <div className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 rounded border border-border/40 bg-background text-foreground shadow-sm">ENTER</kbd> Select</div>
            <div className="hidden sm:flex items-center gap-2"><div className="flex gap-0.5"><kbd className="px-1 py-0.5 rounded border border-border/40 bg-background text-foreground shadow-sm">↑</kbd><kbd className="px-1 py-0.5 rounded border border-border/40 bg-background text-foreground shadow-sm">↓</kbd></div> Navigate</div>
          </div>
          <div className="text-[10px] font-black text-primary/60 uppercase tracking-tight">{results.length} results</div>
        </div>
      </Command>
    </CommandDialog>
  )
}

function SearchItem({ item, onSelect }: { item: SearchResult, onSelect: () => void }) {
  return (
    <CommandItem
      onSelect={onSelect}
      value={item.title}
      className="flex items-center gap-4 p-3 mt-1.5 last:mb-0 cursor-pointer rounded-md! border border-border/40 data-selected:bg-muted/50 data-selected:border-border/80 group/item"
    >
      <div className="flex-none size-10 flex items-center justify-center shrink-0">
        {item.type === "Blog" ? (
          <FileTextIcon className="size-8 text-muted-foreground/40 group-data-[selected=true]/item:text-primary group-data-[selected=true]/item:scale-110" />
        ) : (
          <FolderIcon className="size-8 text-muted-foreground/40 group-data-[selected=true]/item:text-primary group-data-[selected=true]/item:scale-110" />
        )}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="font-black text-sm text-foreground tracking-tight truncate group-data-[selected=true]/item:text-primary">
            {item.title}
          </span>
          <CornerDownLeftIcon className="size-3 text-primary opacity-0 -translate-x-2 transition-all shrink-0 group-data-[selected=true]/item:opacity-40 group-data-[selected=true]/item:translate-x-0" />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground/60 font-medium truncate leading-tight">
            {item.description || "No description provided"}
          </span>

          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-1.5 shrink-0">
              {item.tags.slice(0, 3).map(tag => (
                <span key={tag} className="flex items-center gap-0.5 text-[9px] font-black text-muted-foreground/30 uppercase tracking-tighter group-data-[selected=true]/item:text-primary/40">
                  <HashIcon size={8} /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </CommandItem>
  )
}