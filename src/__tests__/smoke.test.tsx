import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('../components/ui/card', () => ({
  Card: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardDescription: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('../components/ui/badge', () => ({
  Badge: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>,
}))

jest.mock('../components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

jest.mock('../components/ui/tabs', () => ({
  Tabs: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  TabsContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  TabsList: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('../components/ui/progress', () => ({
  Progress: () => <div />,
}))

jest.mock('lucide-react', () => ({
  Shield: () => <span />,
  TrendingUp: () => <span />,
  Globe: () => <span />,
  Heart: () => <span />,
  ArrowRight: () => <span />,
  RefreshCw: () => <span />,
  ExternalLink: () => <span />,
}))

jest.mock('../components/Header', () => () => <div />)
jest.mock('../components/HeroSection', () => () => <div />)
jest.mock('../components/FeaturesSection', () => () => <div />)
jest.mock('../components/MetricsSection', () => () => <div />)
jest.mock('../components/HowItWorksSection', () => () => <div />)
jest.mock('../components/ImpactSection', () => () => <div />)
jest.mock('../components/Footer', () => () => <div />)

const mockProtocol = {
  name: 'Test Protocol',
  chain: 'Ethereum',
  chainId: 1,
  apy: 10,
  pgs: 8,
  weightedApy: 12,
  isActive: true,
  protocolAddress: '0x123',
  metrics: {
    isOpenSource: true,
    hasGrantsProgram: true,
    isGovernedByDAO: true,
    publicGoodsTreasuryPercentage: 50,
  },
}

const mockStrategy = {
  name: 'Test Strategy',
  description: 'A test strategy',
  tvl: 1000000,
  currentProtocol: 'Test Protocol',
  currentChain: 'Ethereum',
  lastRebalance: new Date().toISOString(),
  totalYieldGenerated: 50000,
  apr: 15,
  publicGoodScore: 80,
  isActive: true,
  position: {
    protocol: 'Test Protocol',
    amount: 1000000,
    depositedAt: new Date().toISOString(),
    lastHarvest: new Date().toISOString(),
  },
}

beforeAll(() => {
  global.fetch = jest.fn((url: string) => {
    if (url === '/api/protocols') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: [mockProtocol] }),
      })
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockStrategy }),
    })
  }) as jest.Mock
})

describe('Home Page', () => {
  it('renders the main dashboard without crashing', async () => {
    render(<Home />)
    expect(await screen.findByText('Live Dashboard')).toBeInTheDocument()
  })
})
