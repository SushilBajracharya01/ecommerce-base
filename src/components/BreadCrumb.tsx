import React, { ReactNode } from 'react'

import Link from 'next/link'
import classNames from 'classnames';


interface IBreadCrumb {
    label: string;
    path: string;
}
interface IBreadCrumbProps {
    breadcrumbs: IBreadCrumb[]
}

export default function NextBreadcrumb({ breadcrumbs }: IBreadCrumbProps) {
    return (
        <div className='mb-2'>
            <ul className={'flex items-center gap-2'}>
                {
                    breadcrumbs.map((breadcrumb, index, { length }) => {
                        const isLast = length - 1 === index;
                        const hasMultiple = length > 1;
                        return (
                            <span className='flex items-center gap-2' key={breadcrumb.path}>
                                <li>
                                    <Link className={classNames('capitalize font-medium', (length - 1 === index) && 'text-primary font-bold')} href={breadcrumb.path}>
                                        {breadcrumb.label}
                                    </Link>
                                </li>
                                {
                                    !isLast && hasMultiple && <span className="text-gray-300">&gt;</span>
                                }
                            </span>
                        )
                    })
                }
            </ul>
        </div>
    )
}
