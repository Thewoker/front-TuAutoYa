'use client'

import React from 'react'

export function CarouselSkeleton() {
    return (
        <div className="relative w-full">
            <div className="flex justify-between mb-4">
                <div className="w-36 h-6 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="overflow-hidden">
                <div className="flex gap-4 p-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex-[0_0_auto] w-48 h-60 bg-gray-200 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            </div>
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg w-8 h-8 flex items-center justify-center"
                disabled
            >
                <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg w-8 h-8 flex items-center justify-center"
                disabled
            >
                <div className="w-4 h-4 bg-gray-200 animate-pulse rounded-full" />
            </button>
        </div>
    )
}
