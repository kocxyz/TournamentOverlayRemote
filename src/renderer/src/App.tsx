import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import TopBar from './components/TopBar'
import { useEffect, useState } from 'react'
import { Refresh } from '@mui/icons-material'

function App(): JSX.Element {
  const [gameType, setGameType] = useState('Game')
  const [gameNumber, setGameNumber] = useState(1)
  const [roundNumber, setRoundNumber] = useState(1)

  const [blueTeamName, setBlueTeamName] = useState('')
  const [blueTeamPoints, setBlueTeamPoints] = useState(0)

  const [yellowTeamName, setYellowTeamName] = useState('')
  const [yellowTeamPoints, setYellowTeamPoints] = useState(0)

  const [bcMessageType, setBcMessageType] = useState('text')
  const [bcMessage, setBcMessage] = useState('')

  const [availClients, setAvailClients] = useState([])
  const [selectedClient, setSelectedClient] = useState<string | null>()

  useEffect(() => {
    const clients = window.electron.ipcRenderer.sendSync('getClients')

    setAvailClients(clients)

    window.electron.ipcRenderer.on('clientsUpdate', (_event, clients) => {
      console.log('clientsUpdate', clients)
      setAvailClients(clients)
    })
  }, [])

  return (
    <Box className="TopLevel">
      <TopBar />
      <Box className="section">
        <Box className="element">
          <Stack direction="row" spacing={0}>
            <Select
              id="GameType"
              variant="outlined"
              size="small"
              value={gameType}
              sx={{ width: '80%' }}
              defaultValue="Game"
              onChange={(event): void => setGameType(event.target.value as string)}
            >
              <MenuItem value="Game">Game</MenuItem>
              <MenuItem value="Training">Training</MenuItem>
              <MenuItem value="Finals">Finals</MenuItem>
            </Select>
            <TextField
              id="GameNumber"
              variant="outlined"
              size="small"
              sx={{ width: '21%' }}
              value={gameNumber}
              disabled={true}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setGameNumber((gameNumber) => gameNumber + 1)}
            >
              +
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setGameNumber((gameNumber) => gameNumber - 1)}
            >
              -
            </Button>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className="element">
          <Stack
            direction="row"
            spacing={0}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              fontSize={20}
              letterSpacing={2}
              sx={{
                marginLeft: '10px'
              }}
            >
              Round
            </Typography>
            <TextField
              id="GameNumber"
              variant="outlined"
              size="small"
              sx={{ width: '21%' }}
              value={roundNumber}
              disabled={true}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setRoundNumber((roundNumber) => roundNumber + 1)}
            >
              +
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setRoundNumber((roundNumber) => roundNumber - 1)}
            >
              -
            </Button>
          </Stack>
        </Box>
      </Box>
      <Divider style={{ width: '90%' }}>
        <Chip label="Teams" />
      </Divider>
      <Box className="section">
        <Box className="element">
          <Typography className="title blue">Blue Team</Typography>
          <Stack direction="row" spacing={0}>
            <TextField
              id="teamname_blue"
              variant="outlined"
              size="small"
              placeholder="Name"
              onChange={(event): void => setBlueTeamName(event.target.value)}
            />
            <TextField
              value={blueTeamPoints}
              variant="outlined"
              size="small"
              sx={{ width: '32%' }}
              disabled={true}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setBlueTeamPoints((points) => points + 1)}
            >
              +
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setBlueTeamPoints((points) => points - 1)}
            >
              -
            </Button>
          </Stack>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box className="element">
          <Typography className="title yellow">Yellow Team</Typography>
          <Stack direction="row" spacing={0}>
            <TextField
              id="teamname_yellow"
              variant="outlined"
              size="small"
              placeholder="Name"
              onChange={(event): void => setYellowTeamName(event.target.value)}
            />
            <TextField
              value={yellowTeamPoints}
              variant="outlined"
              size="small"
              sx={{ width: '32%' }}
              disabled={true}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setYellowTeamPoints((points) => points + 1)}
            >
              +
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: '28%' }}
              onClick={(): void => setYellowTeamPoints((points) => points - 1)}
            >
              -
            </Button>
          </Stack>
        </Box>
      </Box>
      <Divider style={{ width: '90%' }}>
        <Chip label="BC Message" />
      </Divider>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Stack direction="row" spacing={0}>
          <Select
            value={bcMessageType}
            variant="outlined"
            size="small"
            sx={{ width: '125px', maxWidth: '125px', overflow: 'hidden', textOverflow: 'ellipsis' }}
            onChange={(event): void => {
              setBcMessageType(event.target.value as string)
              setBcMessage('')
            }}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="image">Image</MenuItem>
          </Select>
          <TextField
            id="bc_message"
            variant="outlined"
            size="small"
            sx={{ width: '100%' }}
            placeholder={bcMessageType === 'text' ? 'Message' : 'Image/GIF URL'}
            value={bcMessage}
            onChange={(event): void => setBcMessage(event.target.value)}
          />
        </Stack>
      </Box>
      <Divider style={{ width: '90%' }}>
        <Chip label="Save" />
      </Divider>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Stack direction="row" spacing={0} sx={{ width: '90%' }}>
          <Select
            id="client"
            variant="outlined"
            size="small"
            sx={{ width: '80%', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
            value={selectedClient}
            onChange={(event): void => setSelectedClient(event.target.value as string)}
          >
            {((): JSX.Element[] | JSX.Element => {
              if (availClients.length === 0) return <option>None</option>

              return availClients.map((client) => (
                <MenuItem key={client} value={client}>
                  {client}
                </MenuItem>
              ))
            })()}
          </Select>
          <Button
            variant="contained"
            size="small"
            sx={{ width: '20px' }}
            disabled={!selectedClient}
            onClick={(): void => {
              window.electron.ipcRenderer.send('syncData', {
                gameType,
                gameNumber,
                roundNumber,
                blueTeamName,
                blueTeamPoints,
                yellowTeamName,
                yellowTeamPoints,
                bcMessageType,
                bcMessage,
                client: selectedClient
              })
            }}
          >
            <Refresh />
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
