import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  Menu,
  PackageSearch,
  PanelLeftClose,
  Plus,
  Radar,
  Search,
  Sparkles,
  Tag,
  X,
} from 'lucide-react'
import './styles.css'

const competitors = [
  {
    id: 'velune',
    name: 'Velune',
    mark: 'VE',
    descriptor: 'Barrier-first care',
    category: 'Barrier care',
    price: 26,
    share: 18.4,
    change: 12.8,
    sentiment: 86,
    momentum: 91,
    launch: 'Cloud Barrier',
    channels: ['DTC', 'Retail'],
    tone: 'mint',
    color: '#5c9d83',
    note: 'Fastest share gain in the sample',
  },
  {
    id: 'noema',
    name: 'Noema',
    mark: 'NO',
    descriptor: 'Clinical essentials',
    category: 'Active care',
    price: 42,
    share: 24.6,
    change: 8.7,
    sentiment: 78,
    momentum: 82,
    launch: 'Quiet C Serum',
    channels: ['DTC', 'Clinic'],
    tone: 'clay',
    color: '#d38266',
    note: 'Strongest premium conversion',
  },
  {
    id: 'orria',
    name: 'Orria',
    mark: 'OR',
    descriptor: 'Texture-led rituals',
    category: 'Body care',
    price: 31,
    share: 14.9,
    change: 4.2,
    sentiment: 81,
    momentum: 76,
    launch: 'Milk Wash',
    channels: ['Retail', 'Social'],
    tone: 'lilac',
    color: '#8f7d9d',
    note: 'Rising on sensorial language',
  },
  {
    id: 'morrow',
    name: 'Morrow',
    mark: 'MO',
    descriptor: 'Minimalist daily care',
    category: 'Daily care',
    price: 18,
    share: 27.1,
    change: -2.1,
    sentiment: 74,
    momentum: 58,
    launch: 'Everyday Lotion',
    channels: ['Mass', 'DTC'],
    tone: 'sun',
    color: '#d6a85b',
    note: 'Largest reach, softer velocity',
  },
  {
    id: 'serein',
    name: 'Serein',
    mark: 'SE',
    descriptor: 'Sensitive skin studio',
    category: 'Sensitive care',
    price: 36,
    share: 15.0,
    change: 6.4,
    sentiment: 89,
    momentum: 71,
    launch: 'Soft Reset',
    channels: ['DTC', 'Pharmacy'],
    tone: 'blue',
    color: '#6a8fb0',
    note: 'Highest positive sentiment',
  },
]

const signals = [
  {
    id: 'price',
    type: 'PRICE',
    title: 'Velune moved its entry point to $26',
    detail: 'A 7% shift in hero SKU pricing makes the barrier category more accessible.',
    time: '17 min ago',
    tone: 'orange',
  },
  {
    id: 'claim',
    type: 'CLAIM',
    title: '“Quiet performance” is up 12 points',
    detail: 'Low-sensory language now appears across 4 of 5 tracked launch pages.',
    time: '2 hr ago',
    tone: 'green',
  },
  {
    id: 'launch',
    type: 'LAUNCH',
    title: 'Noema added a vitamin C companion',
    detail: 'The new launch extends its clinical essentials system into daily brightening.',
    time: 'Yesterday',
    tone: 'blue',
  },
]

const formulaClusters = [
  { name: 'Barrier complex', count: 18, lift: '+14%', ingredients: ['Ceramide NP', 'Beta-glucan', 'Squalane'], color: 'mint' },
  { name: 'Calm actives', count: 13, lift: '+9%', ingredients: ['Panthenol', 'Allantoin', 'Mugwort'], color: 'blue' },
  { name: 'Peptide story', count: 9, lift: '+6%', ingredients: ['Copper peptide', 'Palmitoyl tripeptide', 'Amino acids'], color: 'clay' },
  { name: 'Sensory wash', count: 7, lift: '+4%', ingredients: ['Oat lipid', 'Glycerin', 'Rice ferment'], color: 'sun' },
]

const viewCopy = {
  overview: {
    eyebrow: 'SIGNAL ROOM / 30 DAY READ',
    title: 'The market is moving toward quieter performance.',
    body: 'A synthetic read on where category momentum, product language, and formula signals are converging.',
  },
  radar: {
    eyebrow: 'RADAR / LIVE SIGNALS',
    title: 'See the signals before they become moves.',
    body: 'Track price changes, launch activity, and the language gaining weight across the market sample.',
  },
  products: {
    eyebrow: 'PRODUCT MAP / CATEGORY SHAPE',
    title: 'Texture is becoming a product claim.',
    body: 'Compare the offers that are winning attention and the sensory cues behind their momentum.',
  },
  formulas: {
    eyebrow: 'FORMULA LAB / INGREDIENT CLUSTERS',
    title: 'Ingredients tell the next story.',
    body: 'Group recurring formula signals into a clear view of what the category is building next.',
  },
  alerts: {
    eyebrow: 'ALERTS / WATCHLIST',
    title: 'A small signal can change the read.',
    body: 'Keep the meaningful changes close: pricing, claims, launches, and shifts in sentiment.',
  },
}

const metricsByPanel = {
  signal: [
    { label: 'Category momentum', value: '+18.6%', detail: 'vs. prior 30 days', trend: [28, 32, 31, 39, 42, 48, 54, 61], accent: 'orange' },
    { label: 'Avg. hero price', value: '$32', detail: 'across 5 tracked brands', trend: [38, 39, 37, 40, 36, 35, 34, 32], accent: 'mint' },
    { label: 'New launches', value: '14', detail: '8 with barrier language', trend: [18, 22, 20, 25, 29, 27, 32, 36], accent: 'blue' },
    { label: 'Signal confidence', value: '94%', detail: 'sample coverage score', trend: [70, 76, 74, 82, 81, 89, 91, 94], accent: 'clay' },
  ],
  rheology: [
    { label: 'Low-sensory share', value: '62%', detail: '+12 points in 30 days', trend: [24, 27, 31, 34, 39, 47, 54, 62], accent: 'orange' },
    { label: 'Cream-gel launches', value: '9', detail: 'highest texture cluster', trend: [20, 21, 23, 27, 31, 38, 40, 44], accent: 'mint' },
    { label: 'Texture mentions', value: '+31%', detail: 'across tracked pages', trend: [20, 28, 25, 32, 39, 41, 49, 58], accent: 'blue' },
    { label: 'Review resonance', value: '4.7/5', detail: 'texture-led reviews', trend: [58, 60, 61, 66, 68, 70, 75, 78], accent: 'clay' },
  ],
  formula: [
    { label: 'Barrier ingredients', value: '18', detail: '+14% cluster lift', trend: [22, 27, 28, 33, 39, 43, 47, 55], accent: 'orange' },
    { label: 'Calm active count', value: '13', detail: 'across 4 categories', trend: [27, 30, 31, 34, 38, 43, 43, 48], accent: 'mint' },
    { label: 'Peptide mentions', value: '+22%', detail: 'year-on-year sample', trend: [12, 17, 15, 22, 28, 25, 32, 36], accent: 'blue' },
    { label: 'INCI overlap', value: '41%', detail: 'shared top 10', trend: [31, 33, 36, 35, 37, 40, 39, 41], accent: 'clay' },
  ],
}

function Sparkline({ points, accent }) {
  const width = 104
  const height = 36
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const line = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width
    const y = height - ((point - min) / range) * 28 - 4
    return `${x},${y}`
  }).join(' ')

  return (
    <svg className={`sparkline sparkline-${accent}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Metric trend">
      <polyline points={line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SignalChart() {
  const signalData = [36, 42, 39, 52, 48, 60, 64, 71, 68, 82, 88, 94]
  const priceData = [61, 59, 62, 57, 56, 54, 52, 55, 50, 48, 46, 45]
  const width = 760
  const height = 250
  const makeLine = (points) => points.map((point, index) => {
    const x = (index / (points.length - 1)) * width
    const y = height - point * 2.1
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="chart-wrap">
      <div className="chart-heading">
        <div>
          <span className="section-kicker">MOMENTUM PULSE</span>
          <h2>Signal velocity</h2>
        </div>
        <span className="chart-period">01 Aug — 30 Aug 2026 <ChevronDown size={14} /></span>
      </div>
      <div className="chart-legend">
        <span><i className="legend-dot orange-dot" /> Category momentum</span>
        <span><i className="legend-dot mint-dot" /> Avg. price pressure</span>
        <span className="confidence"><Sparkles size={13} /> 94% confidence</span>
      </div>
      <div className="line-chart" aria-label="Signal velocity chart">
        <div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
        <div className="chart-plot">
          <div className="grid-line line-100" /><div className="grid-line line-75" /><div className="grid-line line-50" /><div className="grid-line line-25" /><div className="grid-line line-0" />
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Category momentum and price pressure over 30 days">
            <title>Category momentum rises while price pressure declines</title>
            <polyline points={`${makeLine(signalData)} ${width},${height} 0,${height}`} fill="rgba(236, 117, 73, 0.09)" stroke="none" />
            <polyline points={makeLine(signalData)} fill="none" stroke="#ec7549" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <polyline points={makeLine(priceData)} fill="none" stroke="#6eaa91" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" strokeDasharray="7 8" />
            <circle cx={width} cy={height - signalData.at(-1) * 2.1} r="5" fill="#ec7549" />
            <circle cx={width} cy={height - priceData.at(-1) * 2.1} r="5" fill="#6eaa91" />
          </svg>
          <div className="chart-x-labels"><span>01 Aug</span><span>08 Aug</span><span>15 Aug</span><span>22 Aug</span><span>30 Aug</span></div>
        </div>
      </div>
      <div className="chart-note"><ArrowUpRight size={16} /><span>Momentum is accelerating as lower-sensory claims move into mainstream price points.</span></div>
    </div>
  )
}

function RheologyView() {
  const textures = [
    { name: 'Cream-gel', score: 86, change: '+18%', note: 'Light cushion / fast sink' },
    { name: 'Milk wash', score: 73, change: '+11%', note: 'Low foam / soft rinse' },
    { name: 'Cloud balm', score: 64, change: '+8%', note: 'Airy occlusion / no drag' },
    { name: 'Water serum', score: 51, change: '+3%', note: 'High slip / quick drydown' },
  ]

  return (
    <div className="texture-view">
      <div className="chart-heading">
        <div><span className="section-kicker">RHEOLOGY READ</span><h2>Texture is doing the selling.</h2></div>
        <span className="chart-period">5 texture families <ChevronDown size={14} /></span>
      </div>
      <div className="texture-intro"><span className="texture-index">8.4</span><span>sensory index <b>+1.2</b><br />vs. prior read</span></div>
      <div className="texture-list">
        {textures.map((texture) => (
          <div className="texture-row" key={texture.name}>
            <div className="texture-name"><strong>{texture.name}</strong><span>{texture.note}</span></div>
            <div className="texture-meter"><div style={{ width: `${texture.score}%` }} /></div>
            <span className="texture-score">{texture.score}</span>
            <span className="texture-change">{texture.change}</span>
          </div>
        ))}
      </div>
      <div className="chart-note"><Gauge size={16} /><span>Texture language is most correlated with positive first-use reviews in this sample.</span></div>
    </div>
  )
}

function FormulaView() {
  return (
    <div className="formula-view">
      <div className="chart-heading">
        <div><span className="section-kicker">FORMULA MAP</span><h2>Clusters worth watching.</h2></div>
        <span className="chart-period">Top 4 clusters <ChevronDown size={14} /></span>
      </div>
      <div className="formula-grid">
        {formulaClusters.map((cluster) => (
          <article className="formula-card" key={cluster.name}>
            <div className={`formula-orb orb-${cluster.color}`}><FlaskConical size={18} /></div>
            <div className="formula-card-top"><span>{cluster.count} products</span><b>{cluster.lift}</b></div>
            <h3>{cluster.name}</h3>
            <div className="ingredient-list">{cluster.ingredients.map((ingredient) => <span key={ingredient}>{ingredient}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="chart-note"><Sparkles size={16} /><span>Barrier complex is the only cluster gaining in every tracked category.</span></div>
    </div>
  )
}

function MetricCards({ panel }) {
  return (
    <div className="metric-grid">
      {metricsByPanel[panel].map((metric) => (
        <article className="metric-card" key={metric.label}>
          <div className="metric-card-top"><span>{metric.label}</span><ArrowUpRight size={15} /></div>
          <div className="metric-value-row"><strong>{metric.value}</strong><Sparkline points={metric.trend} accent={metric.accent} /></div>
          <span className="metric-detail">{metric.detail}</span>
        </article>
      ))}
    </div>
  )
}

function SignalStack({ readSignals, onRead }) {
  return (
    <aside className="panel signal-panel" id="alerts-panel">
      <div className="panel-title-row"><div><span className="section-kicker">SIGNAL STACK</span><h2>Worth a closer look</h2></div><button className="icon-button" type="button" title="Signal settings" aria-label="Signal settings"><CircleHelp size={17} /></button></div>
      <div className="signal-list">
        {signals.map((signal) => (
          <article className={`signal-item ${readSignals.includes(signal.id) ? 'is-read' : ''}`} key={signal.id}>
            <div className="signal-item-top"><span className={`signal-type type-${signal.tone}`}>{signal.type}</span><span>{signal.time}</span></div>
            <h3>{signal.title}</h3>
            <p>{signal.detail}</p>
            <button className="read-button" type="button" onClick={() => onRead(signal.id)}>{readSignals.includes(signal.id) ? <><Check size={13} /> Read</> : 'Mark read'}</button>
          </article>
        ))}
      </div>
      <button className="text-button" type="button"><span>Open all signals</span><ArrowUpRight size={15} /></button>
    </aside>
  )
}

function CompetitorTable({ competitorsToShow, selected, onToggle, activeCategory, onCategory }) {
  const categories = ['All', 'Barrier care', 'Active care', 'Body care', 'Daily care', 'Sensitive care']

  return (
    <section className="panel competitor-panel" id="competitor-map">
      <div className="panel-title-row table-title-row"><div><span className="section-kicker">COMPETITOR MAP</span><h2>Five brands, one shifting center.</h2></div><span className="sample-stamp">SYNTHETIC SAMPLE / 30D</span></div>
      <div className="category-tabs" role="tablist" aria-label="Competitor categories">
        {categories.map((category) => <button type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} onClick={() => onCategory(category)} key={category}>{category}</button>)}
      </div>
      <div className="competitor-table-wrap">
        <table className="competitor-table">
          <thead><tr><th aria-label="Select" /><th>Competitor</th><th>Category</th><th>Hero price</th><th>Share</th><th>Momentum</th><th>Sentiment</th><th aria-label="Details" /></tr></thead>
          <tbody>
            {competitorsToShow.map((competitor) => {
              const isSelected = selected.includes(competitor.id)
              return (
                <tr className={isSelected ? 'selected-row' : ''} key={competitor.id}>
                  <td><label className="check-control"><input type="checkbox" checked={isSelected} onChange={() => onToggle(competitor.id)} /><span /></label></td>
                  <td><div className="competitor-cell"><span className={`brand-mark mark-${competitor.tone}`}>{competitor.mark}</span><span><strong>{competitor.name}</strong><small>{competitor.descriptor}</small></span></div></td>
                  <td><span className="category-label">{competitor.category}</span></td>
                  <td><strong>${competitor.price}</strong></td>
                  <td><span className="share-cell">{competitor.share}% <b className={competitor.change < 0 ? 'negative' : ''}>{competitor.change > 0 ? '+' : ''}{competitor.change}%</b></span></td>
                  <td><div className="table-score"><span className="table-meter"><i style={{ width: `${competitor.momentum}%`, backgroundColor: competitor.color }} /></span><strong>{competitor.momentum}</strong></div></td>
                  <td><span className="sentiment-score">{competitor.sentiment}</span></td>
                  <td><button className="row-action" type="button" title={`View ${competitor.name}`} aria-label={`View ${competitor.name}`}><ArrowUpRight size={16} /></button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {competitorsToShow.length === 0 && <div className="empty-state"><Search size={22} /><strong>No competitors match that search.</strong><span>Try a broader name or category.</span></div>}
      </div>
    </section>
  )
}

function CompareTray({ selected, selectedCompetitors, onCompare, onRemove }) {
  if (!selected.length) return null

  return (
    <div className="compare-tray">
      <div className="tray-label"><span className="tray-pulse" /> Compare queue <strong>{selected.length}/3</strong></div>
      <div className="tray-brands">{selectedCompetitors.map((competitor) => <span className="tray-brand" key={competitor.id}><i className={`brand-mark mini-mark mark-${competitor.tone}`}>{competitor.mark}</i>{competitor.name}<button type="button" onClick={() => onRemove(competitor.id)} title={`Remove ${competitor.name}`} aria-label={`Remove ${competitor.name}`}><X size={12} /></button></span>)}</div>
      <button className="compare-button" type="button" onClick={onCompare} disabled={selected.length < 2}>Compare now <ArrowUpRight size={15} /></button>
    </div>
  )
}

function CompareModal({ competitorsToCompare, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="compare-modal" role="dialog" aria-modal="true" aria-labelledby="compare-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-heading"><div><span className="section-kicker">SIDE BY SIDE</span><h2 id="compare-title">Compare the signal shape.</h2></div><button className="icon-button" type="button" onClick={onClose} title="Close comparison" aria-label="Close comparison"><X size={18} /></button></div>
        <div className="comparison-grid">
          {competitorsToCompare.map((competitor) => <article className="comparison-card" key={competitor.id}><div className="comparison-brand"><span className={`brand-mark mark-${competitor.tone}`}>{competitor.mark}</span><div><strong>{competitor.name}</strong><span>{competitor.category}</span></div></div><div className="compare-stat"><span>Momentum</span><strong>{competitor.momentum}</strong><div className="compare-bar"><i style={{ width: `${competitor.momentum}%`, backgroundColor: competitor.color }} /></div></div><div className="compare-stat"><span>Share</span><strong>{competitor.share}%</strong><small>{competitor.change > 0 ? '+' : ''}{competitor.change}% change</small></div><div className="compare-stat"><span>Hero price</span><strong>${competitor.price}</strong><small>{competitor.launch}</small></div><div className="compare-tags">{competitor.channels.map((channel) => <span key={channel}>{channel}</span>)}</div></article>)}
        </div>
        <div className="modal-footer"><span><Sparkles size={14} /> Read based on synthetic 30-day sample</span><button className="text-button" type="button" onClick={onClose}>Done <Check size={15} /></button></div>
      </section>
    </div>
  )
}

function App() {
  const [activeView, setActiveView] = useState('overview')
  const [activePanel, setActivePanel] = useState('signal')
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState([])
  const [readSignals, setReadSignals] = useState([])
  const [isCompareOpen, setCompareOpen] = useState(false)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [toast, setToast] = useState('')

  const filteredCompetitors = useMemo(() => competitors.filter((competitor) => {
    const matchesQuery = `${competitor.name} ${competitor.descriptor} ${competitor.category}`.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = activeCategory === 'All' || competitor.category === activeCategory
    return matchesQuery && matchesCategory
  }), [activeCategory, query])

  const selectedCompetitors = selected.map((id) => competitors.find((competitor) => competitor.id === id)).filter(Boolean)

  const changeView = (view) => {
    setActiveView(view)
    if (view === 'radar' || view === 'alerts') setActivePanel('signal')
    if (view === 'products') setActivePanel('rheology')
    if (view === 'formulas') setActivePanel('formula')
    setMobileNavOpen(false)
    window.requestAnimationFrame(() => document.getElementById('workspace-canvas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const changePanel = (panel) => {
    setActivePanel(panel)
    setActiveView(panel === 'signal' ? 'overview' : panel === 'rheology' ? 'products' : 'formulas')
  }

  const toggleSelection = (id) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current)
  }

  const markSignalRead = (id) => setReadSignals((current) => current.includes(id) ? current : [...current, id])

  const exportBrief = () => {
    setToast('Brief queued for export')
    window.setTimeout(() => setToast(''), 2400)
  }

  const copy = viewCopy[activeView]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isMobileNavOpen ? 'mobile-open' : ''}`}>
        <div className="brand-lockup"><span className="brand-glyph"><i /><i /><i /></span><div><strong>fieldnote</strong><span>competitive lab</span></div><button className="mobile-close" type="button" onClick={() => setMobileNavOpen(false)} title="Close navigation" aria-label="Close navigation"><PanelLeftClose size={18} /></button></div>
        <div className="workspace-switcher"><span className="workspace-avatar">CI</span><span><strong>Category intelligence</strong><small>Demo workspace</small></span><ChevronDown size={15} /></div>
        <nav className="primary-nav" aria-label="Primary navigation">
          <span className="nav-label">Workspace</span>
          {[
            ['overview', 'Overview', LayoutDashboard],
            ['radar', 'Radar', Radar],
            ['products', 'Product map', PackageSearch],
            ['formulas', 'Formula lab', FlaskConical],
            ['alerts', 'Alerts', Bell],
          ].map(([id, label, Icon]) => <button type="button" className={activeView === id ? 'nav-item active' : 'nav-item'} onClick={() => changeView(id)} key={id}><Icon size={17} /><span>{label}</span>{id === 'alerts' && <b className="alert-count">3</b>}</button>)}
        </nav>
        <div className="sidebar-foot">
          <div className="sample-card"><div className="sample-card-top"><span className="status-dot" /> Public demo</div><strong>Synthetic market sample</strong><span>No live company data connected</span></div>
          <div className="profile-row"><span className="profile-avatar">RD</span><span><strong>Research desk</strong><small>Read-only analyst</small></span><Menu size={16} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" type="button" onClick={() => setMobileNavOpen(true)} title="Open navigation" aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><i>/</i><strong>Competitive intelligence</strong></div><div className="topbar-actions"><span className="last-updated"><span className="live-dot" /> Updated 8 min ago</span><button className="icon-button help-button" type="button" title="Help" aria-label="Help"><CircleHelp size={18} /></button><button className="outline-button" type="button" onClick={exportBrief}><Download size={15} /> Export brief</button></div></header>
        <div className="content-wrap">
          <section className="page-heading"><div><span className="section-kicker">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.body}</p></div><div className="heading-stamp"><span>READING WINDOW</span><strong>30 days</strong><ChevronDown size={15} /></div></section>
          <div className="toolbar"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search competitors, categories..." /><kbd>/</kbd></label><div className="toolbar-chips"><button className="filter-chip" type="button"><Tag size={14} /> Claims <span>4</span></button><button className="filter-chip" type="button"><Activity size={14} /> Active signals <span>12</span></button><button className="filter-chip muted-chip" type="button">All markets <ChevronDown size={14} /></button></div></div>
          <div className="view-tabs" role="tablist" aria-label="Analysis views"><button type="button" className={activePanel === 'signal' ? 'active' : ''} onClick={() => changePanel('signal')}><Radar size={16} /> Signal room</button><button type="button" className={activePanel === 'rheology' ? 'active' : ''} onClick={() => changePanel('rheology')}><Gauge size={16} /> Rheology</button><button type="button" className={activePanel === 'formula' ? 'active' : ''} onClick={() => changePanel('formula')}><FlaskConical size={16} /> Formula map</button></div>
          <MetricCards panel={activePanel} />
          <div className="primary-grid" id="workspace-canvas"><section className="panel pulse-panel">{activePanel === 'signal' && <SignalChart />}{activePanel === 'rheology' && <RheologyView />}{activePanel === 'formula' && <FormulaView />}</section><SignalStack readSignals={readSignals} onRead={markSignalRead} /></div>
          <CompetitorTable competitorsToShow={filteredCompetitors} selected={selected} onToggle={toggleSelection} activeCategory={activeCategory} onCategory={setActiveCategory} />
          <CompareTray selected={selected} selectedCompetitors={selectedCompetitors} onCompare={() => setCompareOpen(true)} onRemove={(id) => setSelected((current) => current.filter((item) => item !== id))} />
          <footer className="page-footer"><span><Sparkles size={14} /> Built for a clear first read.</span><span>Fieldnote demo / 2026</span></footer>
        </div>
      </main>
      {isCompareOpen && <CompareModal competitorsToCompare={selectedCompetitors} onClose={() => setCompareOpen(false)} />}
      {toast && <div className="toast"><Check size={15} /> {toast}</div>}
    </div>
  )
}

export default App
