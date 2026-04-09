"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SearchDialog } from "./SearchDialog"

interface LayoutWrapperProps {
  title: string
  postCount: number
  categoryCount: number
  tagCount: number
  recentPosts: any[]
  children: React.ReactNode
  footer: React.ReactNode
}

export function LayoutWrapper({
  title,
  postCount,
  categoryCount,
  tagCount,
  recentPosts,
  children,
  footer
}: LayoutWrapperProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        title={title}
        postCount={postCount}
        categoryCount={categoryCount}
        tagCount={tagCount}
        recentPosts={recentPosts}
      />
      <SidebarInset className="flex-1 w-full bg-background flex flex-col min-h-screen relative">
        <header className="fixed top-0 left-0 right-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-border/40 bg-secondary/15 backdrop-blur-md px-4 md:hidden">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <div className="flex items-center gap-2.5 ml-1">
            <div className="w-6 h-6 rounded-md overflow-hidden shrink-0">
              <a href={import.meta.env.BASE_URL}>
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-full h-full object-cover" />
              </a>
            </div>
            <span className="font-black uppercase tracking-tight text-foreground text-sm">{title}</span>
          </div>
        </header>
        <div className="flex-1 flex flex-col w-full pt-14 md:pt-0 pb-6">
          {children}
        </div>
        {footer}
      </SidebarInset>
      <SearchDialog />
    </SidebarProvider>
  )
}
