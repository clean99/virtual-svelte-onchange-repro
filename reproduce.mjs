import assert from 'node:assert/strict'

const adapters = await import(process.argv[2] || '@tanstack/svelte-virtual')
const results = []

for (const name of ['createVirtualizer', 'createWindowVirtualizer']) {
  let callbacks = 0
  let virtualizer
  const store = adapters[name]({
    count: 100,
    estimateSize: () => 40,
    getScrollElement: () => null,
    onChange: () => callbacks++,
  })
  const unsubscribe = store.subscribe((value) => {
    virtualizer = value
  })

  try {
    virtualizer.measure()
    const before = callbacks
    virtualizer.setOptions({ count: 110 })
    virtualizer.measure()
    results.push({ adapter: name, before, after: callbacks })
  } finally {
    unsubscribe()
  }
}

console.log(results)
assert.deepEqual(results, [
  { adapter: 'createVirtualizer', before: 1, after: 2 },
  { adapter: 'createWindowVirtualizer', before: 1, after: 2 },
])
