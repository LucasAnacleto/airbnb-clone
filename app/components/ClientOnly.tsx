'use client'

import React, { useState, useEffect } from "react";

interface ClientOnlyProps {
    children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    const [hasMountted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, []);

    if (!hasMountted) {
        return null
    }

    return (
        <>
            {children}
        </>
    );
}

export default ClientOnly;