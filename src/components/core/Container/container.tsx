import { FC } from 'react'
import clsx from 'clsx'

interface IContainerProps {
    children: React.ReactNode
    className?: string
    spacingBottom?: boolean
}

const Container: FC<IContainerProps> = (props) => {
    const { children, className, spacingBottom = false } = props

    return (
        <div
            className={clsx(
                'mx-auto max-w-[1250px] px-7 lg:px-14',
                spacingBottom && 'mb-20',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Container
