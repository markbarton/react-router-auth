import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { AlbumArtwork } from "./components/album-artwork"
import { Menu } from "./components/menu"
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"
import { Sidebar } from "./components/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "./data/albums"
import { playlists } from "./data/playlists"
import { useInView } from 'react-intersection-observer'
const IMAGE_API = import.meta.env.VITE_IMAGE_API;
import axios from 'axios';
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

import Masonry from "react-responsive-masonry";

export default function MusicPage() {
    // Main data load Query - keyed on number of days
    /*     let { isLoading, isError, data: imageData, error } = useQuery({
            queryKey: ['images'],
            queryFn: () => getImages()
        }) */
    const { ref, inView } = useInView()

    const getImages = async ({ pageParam }) => {
        const { data } = await axios.get(`${IMAGE_API}/images?page=${pageParam}`)
        return data
    }
    const getImage = async ({ _id }) => {
        const { data } = await axios.get(`${IMAGE_API}/images/${_id}`)
        return data
    }
    const {
        data: imageData,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: getImages,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    })

    const [selectedImage, setSelectedImage] = useState(null)

    const { data: singleImage } = useQuery({
        queryKey: ['image', selectedImage],
        queryFn: () => getImage(selectedImage),
        enabled: Boolean(selectedImage)
    })
    const navigate = useNavigate();
    function handleImageClick(image) {
        navigate(
            `/images/${image._id}`
        )
        //setSelectedImage(image)
    }


    // Function to get the stats for x number of days
    const images = imageData?.pages.map((page) => page.data)
    React.useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])
    return (

        <div className="relative">
            <ScrollArea>
                <div className="flex space-x-4 pb-4">
                    <Masonry columnsCount={3} gutter="30">
                        {imageData && imageData.pages.map((group, i) => {
                            return group.docs.map((image, index) => {
                                //every 4th image make it twice the size
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        onClick={() => handleImageClick(image)}
                                    >

                                        <AlbumArtwork
                                            key={image._id}
                                            album={image}
                                            width={270}
                                            height={270} />
                                    </motion.div>
                                )
                            })
                        })}
                    </Masonry>

                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
            </button>
        </div>
    )
}