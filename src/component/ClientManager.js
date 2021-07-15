import React from 'react'
import DisplayClient from './ClientManager/DisplayClient';
import EditClient from './ClientManager/EditClient'

function ClientManager() {
    return (
        <div>
            <DisplayClient/>
            <EditClient/>
        </div>
    )
}

export default ClientManager
