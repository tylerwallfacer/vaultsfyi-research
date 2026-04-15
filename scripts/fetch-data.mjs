/**
 * Fetch vault and benchmark data from the vaults.fyi API.
 * Run before `astro build` to populate src/data/pages/*.json.
 *
 * Usage:
 *   VAULTS_API_KEY=your_key node scripts/fetch-data.mjs
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { pages } from '../src/config/pages.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../src/data/pages')
const API_BASE = 'https://api.vaults.fyi'
const API_KEY = process.env.VAULTS_API_KEY

if (!API_KEY) {
  console.error('Error: VAULTS_API_KEY environment variable is not set.')
  process.exit(1)
}

const headers = {
  'x-api-key': API_KEY,
  'Content-Type': 'application/json',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE}${path}`)
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach(v => url.searchParams.append(key, v))
    } else if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

async function apiFetch(path, params = {}) {
  const url = buildUrl(path, params)
  console.log(`  GET ${url}`)
  const res = await fetch(url, { headers })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API ${res.status} for ${url}: ${body}`)
  }
  return res.json()
}

/**
 * Translate page config apiParams to actual API query param names.
 * API uses: allowedAssets, allowedProtocols, allowedNetworks, minTvl,
 *           sortBy=apy7day, sortOrder=desc, perPage, page
 */
function toApiParams(pageApiParams, page = 0) {
  const p = {}
  if (pageApiParams.assets?.length)    p.allowedAssets    = pageApiParams.assets
  if (pageApiParams.protocols?.length) p.allowedProtocols = pageApiParams.protocols
  if (pageApiParams.networks?.length)  p.allowedNetworks  = pageApiParams.networks
  if (pageApiParams.minTvl)            p.minTvl           = pageApiParams.minTvl
  p.sortBy    = 'apy7day'
  p.sortOrder = 'desc'
  p.perPage   = pageApiParams.perPage ?? 20
  p.page      = page
  return p
}

/** Fetch one page of results and return { items, hasMore }. */
async function fetchPage(apiParams, page = 0) {
  const data = await apiFetch('/v2/detailed-vaults', toApiParams(apiParams, page))
  const items = data.data ?? data.vaults ?? data.results ?? []
  console.log(`  → ${items.length} vaults (page ${page}), nextPage: ${data.nextPage ?? 'none'}`)
  return { items, hasMore: !!data.nextPage }
}

/** Normalize a vault from the API response into a consistent shape. */
function normalizeVault(v) {
  const apy7d =
    v.apy?.['7day']?.total ??
    v.apy?.['7day'] ??
    v.apy7d ??
    v.apy?.total ??
    0

  const apy7dBase   = v.apy?.['7day']?.base   ?? apy7d
  const apy7dReward = v.apy?.['7day']?.reward  ?? 0

  const tvl   = v.tvlUsd ?? v.tvl ?? 0
  const protocol = v.protocol?.name ?? v.protocolName ?? String(v.protocol ?? 'Unknown')
  const network  = v.network?.name ?? v.network?.slug ?? String(v.network ?? 'unknown')
  const name     = v.name ?? v.vaultName ?? 'Unnamed Vault'
  const asset    = v.asset?.symbol ?? v.assetSymbol ?? String(v.asset ?? '')
  const reputationScore = v.reputationScore ?? v.reputation ?? null

  return {
    name,
    protocol,
    network,
    asset,
    address: v.address ?? v.vaultAddress ?? '',
    apy7d:        parseFloat(apy7d)        || 0,
    apy7dBase:    parseFloat(apy7dBase)    || 0,
    apy7dReward:  parseFloat(apy7dReward)  || 0,
    tvl:          parseFloat(tvl)          || 0,
    reputationScore,
    flags: v.flags ?? [],
  }
}

/** Fetch benchmark APY for a given network. */
async function fetchBenchmark(network = 'ethereum') {
  try {
    const data = await apiFetch(`/v2/benchmarks/${network}`)
    const benchmarks = data.data ?? data.benchmarks ?? []
    console.log(`  Benchmark keys: ${benchmarks.map(b => b.benchmarkCode ?? b.name).join(', ')}`)

    const usdBench = benchmarks.find(b =>
      (b.benchmarkCode ?? b.name ?? '').toLowerCase().includes('usd')
    )
    const ethBench = benchmarks.find(b =>
      (b.benchmarkCode ?? b.name ?? '').toLowerCase().includes('eth')
    )

    const extractRate = (b) => {
      if (!b) return null
      const apy = b.apy
      if (typeof apy === 'number') return apy
      return apy?.['7day']?.total ?? apy?.total ?? null
    }

    return { usd: extractRate(usdBench), eth: extractRate(ethBench) }
  } catch (err) {
    console.warn(`  Warning: benchmark fetch failed: ${err.message}`)
    return { usd: null, eth: null }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

mkdirSync(DATA_DIR, { recursive: true })

const fetchedAt = new Date().toISOString()

console.log('Fetching benchmarks...')
const benchmark = await fetchBenchmark('ethereum')
console.log(`Benchmark — USD: ${benchmark.usd != null ? (benchmark.usd * 100).toFixed(2) + '%' : 'n/a'}, ETH: ${benchmark.eth != null ? (benchmark.eth * 100).toFixed(2) + '%' : 'n/a'}`)

for (const page of pages) {
  console.log(`\nFetching: ${page.slug}`)

  try {
    const { items, hasMore } = await fetchPage(page.apiParams, 0)

    // Fetch page 2 if available and we want more results
    let allItems = [...items]
    if (hasMore && allItems.length < 30) {
      const p2 = await fetchPage(page.apiParams, 1)
      allItems = [...allItems, ...p2.items]
    }

    const vaults = allItems
      .map(normalizeVault)
      .filter(v => v.apy7d > 0)
      .sort((a, b) => b.apy7d - a.apy7d)
      .slice(0, 15)

    const benchmarkRate = page.benchmarkAsset === 'eth' ? benchmark.eth : benchmark.usd

    writeFileSync(
      join(DATA_DIR, `${page.slug}.json`),
      JSON.stringify({ config: page, vaults, benchmarkRate, fetchedAt }, null, 2)
    )
    console.log(`  ✓ saved ${vaults.length} vaults`)
  } catch (err) {
    console.error(`  ✗ ${err.message}`)
    writeFileSync(
      join(DATA_DIR, `${page.slug}.json`),
      JSON.stringify({ config: page, vaults: [], benchmarkRate: null, fetchedAt, error: err.message }, null, 2)
    )
  }
}

console.log('\nDone.')
