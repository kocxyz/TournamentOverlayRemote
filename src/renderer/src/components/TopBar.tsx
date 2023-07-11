import { Box, IconButton } from '@mui/material'
import { Close as CloseIcon, Minimize, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

function TopBar(): JSX.Element {
  const [pinned, setPinned] = useState(false)

  return (
    <Box className="topBar">
      <IconButton
        size="small"
        onClick={(): void => {
          setPinned((pinned) => !pinned)
          window.electron.ipcRenderer.send('toggleOnTop', !pinned)
        }}
      >
        {pinned ? <Visibility /> : <VisibilityOff />}
      </IconButton>
      <div className="dragBar" />
      <IconButton size="small" onClick={(): void => window.electron.ipcRenderer.send('minimize')}>
        <Minimize />
      </IconButton>
      <IconButton size="small" onClick={(): void => window.electron.ipcRenderer.send('close')}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export default TopBar
