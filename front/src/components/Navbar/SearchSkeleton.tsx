'use client'

import React from 'react'

export function SearchSkeleton() {
    return (
      <div className="animate-pulse flex items-center max-w-3xl mx-auto bg-white rounded-lg shadow p-3">
        {/* Skeleton for the location input */}
        <div className="h-10 flex-1 bg-gray-300 rounded-l-lg"></div>
        
        {/* Skeleton for the brand dropdown */}
        <div className="h-10 w-32 mx-2 bg-gray-300 rounded"></div>
        
        {/* Skeleton for the model dropdown */}
        <div className="h-10 w-32 mx-2 bg-gray-300 rounded"></div>
        
        {/* Skeleton for the start date input */}
        <div className="h-10 w-28 mx-2 bg-gray-300 rounded"></div>
        
        {/* Skeleton for the end date input */}
        <div className="h-10 w-28 mx-2 bg-gray-300 rounded"></div>
        
        {/* Skeleton for the search button */}
        <div className="h-10 w-20 bg-gray-400 rounded-r-lg"></div>
      </div>
    );
  }