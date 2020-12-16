import React from 'react'
import ReactPlayer from 'react-player'

export const Player = ({
    url = 'https://Version 4storage.blob.core.windows.net/publicproducts/5ad7523a-cf4e-4dfa-8942-6c6fa1a86744.mp4'
}) => {
    return (
        <div> 
            <ReactPlayer 
                url={url}
                width='100%'
                height='100%'
                controls
            />
        </div>
    )
}
