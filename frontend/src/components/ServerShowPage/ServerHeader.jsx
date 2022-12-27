import React from 'react'
import "./ServerShowPage.css"

const ServerHeader = ({ server }) => {
  return (
    <div className="server-header">
        <h4>{server.server_name}</h4>
        <div className='rest-of-the-header'></div>
    </div>
  )
}

export default ServerHeader;