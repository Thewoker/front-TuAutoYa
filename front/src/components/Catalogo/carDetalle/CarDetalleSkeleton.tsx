'use client'

import React from 'react';

const CarDetailSkeleton = () => {
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="border-b flex flex-wrap items-baseline mx-auto max-w-2xl px-4 pb-5 pt-10 sm:px-6 lg:max-w-7xl">
          <div className="flex-auto">
            <div className="h-8 bg-gray-300 w-3/4 rounded"></div>
          </div>
          <div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="border-b mx-auto max-w-2xl px-4 pb-5 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-5 lg:pt-5">
          <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8">
            <div className="relative w-full h-96 bg-gray-300 rounded-lg"></div>
            <div className="mt-8 mb-8 p-3 border bg-gray-100">
              <div className="border-b pb-3 mb-3">
                <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-4">
                {Array(4).fill('').map((_, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4 flex items-center space-x-3">
                    <div className="h-6 w-12 bg-gray-300 rounded"></div>
                    <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0 rounded-lg shadow-sm bg-white">
            <div className="border p-5 mb-5">
              <div className="border-b">
                <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
                <div className="flex items-center gap-1 mt-4">
                  <div className="h-5 bg-gray-300 w-16 rounded"></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
              </div>
            </div>
            <div className="border p-5">
              <div className="border-b">
                <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
              </div>
              <div className="mt-3">
                <div className="h-6 bg-gray-300 w-1/2 rounded"></div>
              </div>
              <div className="mt-3">
                <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailSkeleton;
