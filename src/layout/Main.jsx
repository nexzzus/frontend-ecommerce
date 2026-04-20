import React from 'react'

function Main({ children }) {
    return (
        <main className="h-full overflow-y-auto w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6">{children}</div>
        </main>
    )
}

export default Main
