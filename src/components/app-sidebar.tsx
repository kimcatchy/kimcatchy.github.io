import * as React from "react"
import { Home, Book, User, Hash, Tag, FolderRoot, Clock, Library, Zap } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Profile } from "./Profile"
import { SearchTrigger } from "./SearchDialog"

interface PostInfo {
  id: string
  title: string
  date: string
}

export function AppSidebar({
  title,
  postCount,
  categoryCount,
  tagCount,
  recentPosts,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  title: string
  postCount: number
  categoryCount: number
  tagCount: number
  recentPosts: PostInfo[]
}) {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar md:bg-sidebar/70 md:backdrop-blur-md" {...props}>
      <SidebarHeader className="pt-8 pb-4 px-4">
        <Profile title={title} />
        <div className="px-0 pb-2">
          <SearchTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 pb-8 space-y-8 vertical-scrollbar">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-0 w-full py-4 rounded-md bg-secondary/20 border border-border/40">
          <div className="flex flex-col items-center border-r border-border/30">
            <span className="text-sm font-black text-primary leading-none">{postCount}</span>
            <span className="text-xs font-black text-muted-foreground/60 uppercase mt-1.5 tracking-tight">Posts</span>
          </div>
          <div className="flex flex-col items-center border-r border-border/30">
            <span className="text-sm font-black text-foreground leading-none">{categoryCount}</span>
            <span className="text-xs font-black text-muted-foreground/60 uppercase mt-1.5 tracking-tight">Cats</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-black text-foreground leading-none">{tagCount}</span>
            <span className="text-xs font-black text-muted-foreground/60 uppercase mt-1.5 tracking-tight">Tags</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-8">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-muted-foreground/50 uppercase px-2 mb-3 flex items-center gap-2 tracking-tight">
              <Zap size={12} className="text-primary" /> Navigation
            </h4>
            <div className="flex flex-col gap-1">
              <a href={import.meta.env.BASE_URL} className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all no-underline">
                <Home size={14} className="shrink-0 opacity-70" /> Home
              </a>
              
              <Accordion className="w-full border-none">
                <AccordionItem value="posts" className="border-none">
                  <AccordionTrigger className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all w-full text-left hover:no-underline group/trigger py-2 border-none">
                    <div className="flex items-center gap-3">
                      <Library size={14} className="shrink-0 opacity-70" /> Posts
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1 flex flex-col gap-1 pl-6 transition-all border-none">
                    <a href={`${import.meta.env.BASE_URL}blog`} className="flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all no-underline">
                      <Book size={12} className="shrink-0 opacity-70" /> Archive
                    </a>
                    <a href={`${import.meta.env.BASE_URL}category`} className="flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all no-underline">
                      <Hash size={12} className="shrink-0 opacity-70" /> Categories
                    </a>
                    <a href={`${import.meta.env.BASE_URL}tags`} className="flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all no-underline">
                      <Tag size={12} className="shrink-0 opacity-70" /> Tags
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <a href={`${import.meta.env.BASE_URL}projects`} className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all no-underline">
                <FolderRoot size={14} className="shrink-0 opacity-70" /> Projects
              </a>
              <a href={`${import.meta.env.BASE_URL}about`} className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-black uppercase tracking-tight text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all no-underline">
                <User size={14} className="shrink-0 opacity-70" /> About
              </a>
            </div>
          </div>

          {/* Recent Posts Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <h4 className="text-xs font-black text-muted-foreground/50 uppercase tracking-tight whitespace-nowrap">
                <Clock size={12} className="inline mr-2 text-primary" /> Recent Feed
              </h4>
              <Separator className="flex-1 opacity-20" />
            </div>
            <div className="flex flex-col gap-2">
              {recentPosts.map((post) => (
                <a key={post.id} href={`${import.meta.env.BASE_URL}blog/${post.id}/`} className="group/card block px-3 py-2.5 hover:bg-primary/5 rounded-md transition-all no-underline border-l-2 border-transparent hover:border-primary">
                  <span className="text-xs font-black text-foreground group-hover/card:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                    {post.title}
                  </span>
                  <span className="text-xs font-black text-muted-foreground/40 uppercase block tracking-tight">
                    {post.date}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}
