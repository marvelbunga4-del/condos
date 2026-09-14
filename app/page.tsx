'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Ellipsis,
  Gamepad2,
  LockKeyhole,
  Maximize2,
  Minus,
  RotateCw,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

type ServerStatus = 'Available' | 'Busy'

type CondoServer = {
  id: number
  name: string
  players: number
  status: ServerStatus
  code: string
  image: string
  avatars: string[]
  destination: string
}

const serverImages = [
  'https://i.ibb.co.com/WWCsWmyn/IMG-20260911-WA0026.jpg',
  'https://i.ibb.co.com/gbjgXB3Z/IMG-20260911-WA0025.jpg',
  'https://i.ibb.co.com/bR6hwgfG/IMG-20260911-WA0027.jpg',
  'https://i.ibb.co.com/msxczxJ/IMG-20260911-WA0028.jpg',
  'https://i.ibb.co.com/G4nMMHyG/IMG-20260911-WA0029.jpg',
]

const avatarPool = [
  'https://tr.rbxcdn.com/30DAY-AvatarHeadshot-E5988C142C147FC9D3D0DA0C7736C712-Png/150/150/AvatarHeadshot/Webp/noFilter',
  'https://tr.rbxcdn.com/30DAY-AvatarHeadshot-456E27ADA99A21CADD2590306EE214A6-Png/150/150/AvatarHeadshot/Webp/noFilter',
  'https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A4F764CB5B7A62140A826DCBA9EE5F7E-Png/150/150/AvatarHeadshot/Webp/noFilter',
  'https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D4D11216A344CB00BC3E851B9E66CE1D-Png/150/150/AvatarHeadshot/Webp/noFilter',
]

const initialServers: CondoServer[] = [
  { id: 1, name: 'Condo 1', players: 20, status: 'Available', code: 'EA14 - 8899', image: serverImages[0], avatars: avatarPool, destination: 'https://www.roblox.com.hr/games/121948669846036/sword-fight-on-a-baseplate?privateServerLinkCode=55760827041847853770440644606720' },
  { id: 2, name: 'Condo 2', players: 4, status: 'Available', code: '83F3 - 2452', image: serverImages[1], avatars: avatarPool.slice().reverse(), destination: 'https://www.roblox.com.hr/games/121948669846036/sword-fight-on-a-baseplate?privateServerLinkCode=55760827041847853770440644606720' },
  { id: 3, name: 'Condo 3', players: 15, status: 'Available', code: '4468 - 5048', image: serverImages[2], avatars: avatarPool, destination: 'https://www.roblox.com.hr/games/121948669846036/sword-fight-on-a-baseplate?privateServerLinkCode=55760827041847853770440644606720' },
  { id: 4, name: 'Condo 4', players: 25, status: 'Busy', code: '39E4 - 2402', image: serverImages[3], avatars: avatarPool.slice().reverse(), destination: 'https://www.roblox.com.hr/games/121948669846036/sword-fight-on-a-baseplate?privateServerLinkCode=55760827041847853770440644606720' },
  { id: 5, name: 'Condo 5', players: 18, status: 'Available', code: '67D2 - 8941', image: serverImages[4], avatars: avatarPool, destination: 'https://www.roblox.com.hr/games/121948669846036/sword-fight-on-a-baseplate?privateServerLinkCode=55760827041847853770440644606720' },
]

export default function Home() {
  const [servers, setServers] = useState(initialServers)
  const [selected, setSelected] = useState<CondoServer | null>(null)
  const [loading, setLoading] = useState(true)
  const [iframeLoading, setIframeLoading] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const refresh = window.setInterval(() => {
      setServers((current) => current.map((server) => ({
        ...server,
        players: Math.max(2, Math.min(29, server.players + (Math.random() > 0.5 ? 1 : -1))),
      })))
    }, 5000)
    return () => window.clearInterval(refresh)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const activeServers = servers.length
  const openServer = (server: CondoServer) => {
    setSelected(server)
    setIframeLoading(true)
  }
  const closeServer = () => setSelected(null)

  return (
    <div className="condo-app">
      <div className="background-grid" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="ambient-orb orb-one" aria-hidden="true" />
      <div className="ambient-orb orb-two" aria-hidden="true" />

      <div className={`page-loader ${loading ? '' : 'page-loader-hidden'}`} aria-hidden={!loading}>
        <div className="loader-ring"><Gamepad2 /></div>
        <div className="loader-title">CONDO HUB</div>
        <div className="loader-subtitle">LOADING WEBSITE...</div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Condo Hub home">
          <span className="brand-mark"><Gamepad2 /></span>
          <span>CONDO HUB</span>
        </a>
        <div className="online-pill"><span className="pulse-dot" /> System Online</div>
      </header>

      <main id="top" className="site-main">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles /> Official Server Hub</div>
            <h1 id="hero-title">Welcome To <span>Condo Hub</span></h1>
            <p>Choose your favorite server and start playing with other players. This system is synchronized in real-time with the condo server.</p>
            <div className="hero-trust"><ShieldCheck /> Live player counts <span /> Updated automatically</div>
          </div>
          <div className="hero-media">
            <img src={serverImages[0]} alt="A colorful Roblox condo server preview" />
            <div className="media-shade" />
            <div className="live-badge"><span /> LIVE</div>
            <div className="media-caption"><span>Condo Hub</span><small>Community server network</small></div>
          </div>
        </section>

        <section className="server-section" aria-labelledby="server-heading">
          <div className="section-heading">
            <div>
              <h2 id="server-heading">Choose <span>Server</span></h2>
              <p>Players go up and down dynamically. Choose the quietest one for the best performance!</p>
            </div>
            <div className="server-count"><Server /> {activeServers} Active Servers</div>
          </div>

          <div className="server-grid">
            {servers.map((server) => {
              const percentage = Math.round((server.players / 30) * 100)
              const busy = percentage >= 75
              return (
                <article className="server-card" key={server.id}>
                  <div className="card-topline">
                    <h3>{server.name}</h3>
                    <span className={`status ${busy ? 'status-busy' : 'status-available'}`}><i /> {busy ? server.status : 'Available'}</span>
                  </div>
                  <div className="server-image">
                    <img src={server.image} alt={`${server.name} preview`} loading="lazy" />
                    <span className="available-tag"><Check /> Available</span>
                  </div>
                  <div className="player-row">
                    <div><strong>{server.players}</strong> / 30 Players</div>
                    <div className="avatar-stack" aria-label={`${server.players} players online`}>
                      {server.avatars.map((avatar, index) => <img key={`${server.id}-${index}`} src={avatar} alt="" />)}
                    </div>
                  </div>
                  <div className="capacity-wrap">
                    <div className="capacity-label"><span>{server.players} / 30 Players</span><span>{percentage}%</span></div>
                    <div className="capacity-track"><div className={`capacity-fill ${busy ? 'fill-busy' : 'fill-good'}`} style={{ width: `${percentage}%` }} /></div>
                  </div>
                  <button className="join-button" onClick={() => openServer(server)}>Join Server <ArrowRight /></button>
                  <div className="card-footer">ID: {server.code}</div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer"><p>© 2024 Condo Hub. All rights reserved.</p><span>Built for the community</span></footer>

      {selected && (
        <div className="modal-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeServer()}>
          <div className="browser-window" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="window-titlebar">
              <div className="window-tab"><Gamepad2 /><span id="modal-title">{selected.name} · Roblox</span></div>
              <div className="window-controls"><button aria-label="Minimize"><Minus /></button><button aria-label="Maximize"><Maximize2 /></button><button className="close-control" aria-label="Close" onClick={closeServer}><X /></button></div>
            </div>
            <div className="browser-toolbar">
              <div className="browser-nav"><button aria-label="Back"><ArrowLeft /></button><button aria-label="Forward"><ArrowRight /></button><button aria-label="Reload" onClick={() => { setIframeLoading(true); setSelected({ ...selected }) }}><RotateCw /></button></div>
              <div className="address-bar"><LockKeyhole /><span>roblox.com</span></div>
              <div className="browser-actions"><button aria-label="Bookmark"><Bookmark /></button><button aria-label="More options"><Ellipsis /></button></div>
            </div>
            <div className="browser-content">
              {iframeLoading && <div className="browser-loader"><div className="chrome-spinner" /><a href={selected.destination} target="_blank" rel="noreferrer">Click here if it doesn&apos;t open automatically</a></div>}
              <iframe src={selected.destination} title={`${selected.name} game`} onLoad={() => setIframeLoading(false)} sandbox="allow-scripts allow-same-origin allow-forms" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
