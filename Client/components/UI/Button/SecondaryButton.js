import React from 'react'

const SecondaryButton = ({
    disabled = false,
    isLoading = false,
    handleClick,
    text,
    size = 'small',
    width = 'full',
    height = 'full',
    children,
}) => {
    return size === 'small' ? (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`${'w-' + width} ${
                'h-' + height
            } px-3 py-2 text-base font-bold text-Blue rounded-lg bg-transparent border-[1.5px] border-Blue flex items-center justify-center hover:bg-Blue hover:text-white transition-all duration-300 disabled:opacity-60 whitespace-nowrap`}
        >
            {isLoading ? (
                <div
                    className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
                />
            ) : text ? (
                text
            ) : (
                children
            )}
        </button>
    ) : (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`w-full py-5 text-xl font-bold text-Blue rounded-lg bg-transparent border-[1.5px] border-Blue flex items-center justify-center hover:shadow-lg transition-all duration-300 whitespace-nowrap`}
        >
            {isLoading ? (
                <div
                    className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
                />
            ) : text ? (
                text
            ) : (
                children
            )}
        </button>
    )
}

export default SecondaryButton
