# Svelte `onChange` stops firing after a partial `setOptions` update

Run `npm install` and `npm start`.

The script creates `createVirtualizer` and `createWindowVirtualizer` stores with an `onChange` counter, calls `measure()` once, then `setOptions({ count: 110 })` and `measure()` again.

Expected: the counter goes from 1 to 2 for both adapters, because `onChange` was not part of the update.

Actual: it stays at 1, so the assertion at the end fails. No browser or component is needed.
