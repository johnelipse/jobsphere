"use client";

export default function JobDetailsSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Job Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Job Title and Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                {/* Title */}
                <div className="h-7 bg-gray-200 rounded-md w-2/3 animate-pulse"></div>

                {/* Posted time and location */}
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                </div>

                {/* Specialized profile notice */}
                <div className="flex items-start space-x-2">
                  <div className="mt-1 h-5 w-5 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                  </div>
                </div>

                {/* Job description */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                </div>

                {/* Job details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse mt-0.5"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hourly rate */}
                <div className="flex items-start space-x-2 pt-2">
                  <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse mt-0.5"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded-md w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse"></div>
                  </div>
                </div>

                {/* Project type */}
                <div className="pt-2 flex items-center space-x-2">
                  <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                </div>
              </div>

              {/* Skills and Expertise */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded-md w-48 animate-pulse mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-gray-200 rounded-full w-28 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-32 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                </div>
              </div>

              {/* Activity on this job */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded-md w-48 animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upgrade membership */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-5 w-5 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Client Info */}
            <div className="space-y-6">
              {/* Apply section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Apply button */}
                <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>

                {/* Save button */}
                <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse mt-3"></div>

                {/* Connects info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-8 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded-md w-36 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-8 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* About the client */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded-md w-40 animate-pulse mb-4"></div>

                {/* Client verification placeholders */}
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="ml-2 h-4 bg-gray-200 rounded-md w-40 animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Client location */}
                <div className="pt-4">
                  <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-32 animate-pulse"></div>
                </div>

                {/* Client job history */}
                <div className="pt-4">
                  <div className="h-4 bg-gray-200 rounded-md w-28 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-40 animate-pulse"></div>
                </div>

                {/* Client membership */}
                <div className="pt-4">
                  <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
                </div>

                {/* Job link */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="h-5 bg-gray-200 rounded-md w-20 animate-pulse mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
