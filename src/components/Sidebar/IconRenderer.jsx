import React from 'react'
import { getIcon } from '../../utils/icons'

function IconRenderer({ iconName, ...props }) {
    const Icon = getIcon(iconName)
    return <Icon {...props} />
}

export default IconRenderer

