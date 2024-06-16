import { Outlet } from "react-router-dom"
import React, { useState } from 'react'
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Menu } from "./music/components/menu"
import { Sidebar } from "./music/components/sidebar"
import { playlists } from "./music/data/playlists"
export const Layout = ({ children }) => {
    return (
        <>
            <div className="md:hidden">
                <img
                    src="/examples/music-light.png"
                    width={1280}
                    height={1114}
                    alt="Music"
                    className="block dark:hidden"
                />
                <img
                    src="/examples/music-dark.png"
                    width={1280}
                    height={1114}
                    alt="Music"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden md:block">
                <Menu />
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar playlists={playlists} className="hidden lg:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8">

                                    <div className="ml-auto mr-4">
                                        <Button>
                                            <PlusCircledIcon className="mr-2 h-4 w-4" />
                                            Add music
                                        </Button>
                                    </div>

                                    <Outlet />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}