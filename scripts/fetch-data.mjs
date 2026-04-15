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
const API_BASE = 'https://api.vaults.fyi/v2'
const API_KEY = process.env.VAULTS_API_KEY

if (!API_KEY) {
  console.error('Error: VAULTS_API_KEY environment variable is not set.')
  process.exit(1)
}

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
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
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${url}: ${await res.text()}`)
  }
  return res.json()
}

/** Fetch all pages of a paginated endpoint, up to maxPages. */
async function fetchAllPages(path, params = {}, maxPages = 5) {
  const results = []
  let page = 0
  while (page < maxPages) {
    const data = await apiFetch(path, { ...params, page, perPage: params.perPage ?? 50 })
    const items = data.data ?? data.vaults ?? data.results ?? []
    results.push(...items)
    if (!data.nextPage) break
    page++
  }
  return results
}

/** Normalize a vault from the API response into a consistent shape. */
function normalizeVault(v) {
  const apy7d =
    v.apy?.['7day']?.total ??
    v.apy?.['7day'] ??
    v.apy7d ??
    v.apy?.total ??
    0

  const apy7dBase = v.apy?.['7day']?.base ?? v.apy7d ?? apy7d
  const apy7dReward = v.apy?.['7day']?.reward ?? 0

  const tvl = v.tvlUsd ?? v.tvl ?? 0
  const protocol = v.protocol?.name ?? v.protocolName ?? String(v.protocol ?? 'Unknown')
  const network = v.network ?? 'unknown'
  const name = v.name ?? v.vaultName ?? 'Unnamed Vault'
  const asset = v.asset?.symbol ?? v.assetSymbol ?? v.asset ?? ''
  const reputationScore = v.reputationScore ?? v.reputation ?? null
  const address = v.address ?? v.vaultAddress ?? ''
  const flags = v.flags ?? []

  return {
    name,
    protocol,
    network,
    asset,
    address,
    apy7d: parseFloat(apy7d) || 0,
    apy7dBase: parseFloat(apy7dBase) || 0,
    apy7dReward: parseFloat(apy7dReward) || 0,
    tvl: parseFloat(tvl) || 0,
    reputationScore,
    flags,
  }
}

/** Fetch benchmark APY for USD or ETH on a given network. */
async function fetchBenchmark(network = 'ethereum') {
  try {
    const data = await apiFetch(`/v2/benchmarks/${network}`)
    // Response shape: { data: [ { benchmarkCode, apy: { '7day': { total } } } ] }
    const benchmarks = data.data ?? data.benchmarks ?? []
    const usdBench = benchmarks.find(b =>
      b.benchmarkCode?.toLowerCase().includes('usd') ||
      b.name?.toLowerCase().includes('usd')
    )
    const ethBench = benchmarks.find(b =>
      b.benchmarkCode?.toLowerCase().includes('eth') ||
      b.name?.toLowerCase().includes('eth')
    )

    const extractRate = (b) => {
      if (!b) return null
      const apy = b.apy
      if (typeof apy === 'number') return apy
      return apy?.['7day']?.total ?? apy?.total ?? null
    }

    return {
      usd: extractRate(usdBench),
      eth: extractRate(ethBench),
    }
  } catch (err) {
    console.warn(`  Warning: could not fetch benchmark for ${network}: ${err.message}`)
    return { usd: null, eth: null }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

mkdirSync(DATA_DIR, { recursive: true })

const fetchedAt = new Date().toISOString()
const benchmark = await fetchBenchmark('ethereum')

console.log(`Benchmark rates — USD: ${benchmark.usd ? (benchmark.usd * 100).toFixed(2) + '%' : 'n/a'}, ETH: ${benchmark.eth ? (benchmark.eth * 100).toFixed(2) + '%' : 'n/a'}`)

for (const page of pages) {
  console.log(`Fetching data for: ${page.slug}`)

  try {
    const rawVaults = await fetchAllPages('/v2/detailed-vaults', page.apiParams)
    const vaults = rawVaults
      .map(normalizeVault)
      .filter(v => v.apy7d > 0)
      .sort((a, b) => b.apy7d - a.apy7d)
      .slice(0, 15)

    const benchmarkRate = page.benchmarkAsset === 'eth' ? benchmark.eth : benchmark.usd

    const output = {
      config: page,
      vaults,
      benchmarkRate,
      fetchedAt,
    }

    const outPath = join(DATA_DIR, `${page.slug}.json`)
    writeFileSync(outPath, JSON.stringify(output, null, 2))
    console.log(`  ✓ ${vaults.length} vaults → ${outPath}`)
  } catch (err) {
    console.error(`  ✗ Error fetching ${page.slug}: ${err.message}`)
    // Write empty fallback so the build doesn't fail
    const outPath = join(DATA_DIR, `${page.slug}.json`)
    writeFileSync(outPath, JSON.stringify({
      config: page,
      vaults: [],
      benchmarkRate: null,
      fetchedAt,
      error: err.message,
    }, null, 2))
  }
}

console.log('Done.')
