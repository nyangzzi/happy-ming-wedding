import { createBrowserRouter } from 'react-router-dom'

import GamePage from '../pages/GamePage'
import HomePage from '../pages/HomePage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/game', element: <GamePage /> },
])
