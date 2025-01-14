'use client'

import React from 'react';

export default function CatalogSkeleton() {
    const itemsPerPage = 10;
  
    return (
      <div className="bg-white">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Filtros</h1>
            <div className="flex items-center">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse ml-5 sm:ml-7"></div>
            </div>
          </div>
  
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filtros Skeleton */}
              <div className="hidden lg:block">
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="border-b border-gray-200 py-6">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
                      <div className="space-y-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Cars Skeleton */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
                  {Array.from({ length: itemsPerPage }).map((_, idx) => (
                    <div
                      key={idx}
                      className="group relative border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="h-48 w-full bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="mt-4 space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="mt-3 h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
  
                {/* Paginación Skeleton */}
                <div className="flex justify-between items-center mt-6">
                  <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  