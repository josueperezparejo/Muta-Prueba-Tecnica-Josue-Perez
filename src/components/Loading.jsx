export const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin w-24 h-24">
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="48" cy="48" r="48" fill="#F3F4F6"/>
            <path d="M48 0C21.4903 0 0 21.4903 0 48C0 74.5097 21.4903 96 48 96C74.5097 96 96 74.5097 96 48C96 21.4903 74.5097 0 48 0ZM48 10.6667C68.5867 10.6667 85.3333 27.4133 85.3333 48C85.3333 68.5867 68.5867 85.3333 48 85.3333C27.4133 85.3333 10.6667 68.5867 10.6667 48C10.6667 27.4133 27.4133 10.6667 48 10.6667Z" fill="#1F2937"/>
            <path d="M48 0C21.4903 0 0 21.4903 0 48H96C96 21.4903 74.5097 0 48 0Z" fill="#EF4444"/>
            <circle cx="48" cy="48" r="16" fill="white" stroke="#1F2937" strokeWidth="5"/>
          </svg>
        </div>
      </div>
    )
  }