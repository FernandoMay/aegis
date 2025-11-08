 'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    const eth = (window as any).ethereum
    if (eth) {
      setIsAvailable(true)
      eth.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts && accounts.length > 0) setAddress(accounts[0])
      }).catch(() => {})

      eth.request({ method: 'eth_chainId' }).then((id: string) => setChainId(id)).catch(() => {})

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null)
        } else {
          setAddress(accounts[0])
        }
      }

      const handleChainChanged = (id: string) => {
        setChainId(id)
      }

      eth.on && eth.on('accountsChanged', handleAccountsChanged)
      eth.on && eth.on('chainChanged', handleChainChanged)

      return () => {
        eth.removeListener && eth.removeListener('accountsChanged', handleAccountsChanged)
        eth.removeListener && eth.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const connect = async () => {
    const eth = (window as any).ethereum
    if (!eth) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }
    try {
      const accounts: string[] = await eth.request({ method: 'eth_requestAccounts' })
      if (accounts && accounts.length > 0) setAddress(accounts[0])
      const id: string = await eth.request({ method: 'eth_chainId' })
      setChainId(id)
    } catch (err) {
      console.error('User rejected connect or error:', err)
    }
  }

  const disconnect = () => {
    // Can't programmatically disconnect injected wallets; clear local state
    setAddress(null)
    setChainId(null)
  }

  const short = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`

  if (!isAvailable) {
    return (
      <Button type="button" size="sm" onClick={() => window.open('https://metamask.io/download/', '_blank')} className="gap-2">
        Install Wallet
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {address ? (
        <div className="flex items-center gap-2">
          <div className="text-sm text-slate-700 dark:text-slate-200">{short(address)}</div>
          <Button type="button" size="sm" variant="outline" onClick={disconnect} className="gap-2">
            Disconnect
          </Button>
        </div>
      ) : (
        <Button type="button" size="sm" onClick={connect} className="gap-2 bg-green-600 hover:bg-green-700">
          Connect Wallet
        </Button>
      )}
    </div>
  )
}
