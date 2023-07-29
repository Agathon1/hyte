const url = new URL('paq.wasm', import.meta.url);

const init = async (name) => {
  const mod = await WebAssembly.compileStreaming(await fetch(url, { cache: 'force-cache' }));
  const wasm = (await WebAssembly.instantiate(mod)).exports;

  return it => {
    const n1 = it.length;
    const p1 = wasm.__wbindgen_malloc(n1, 1);
    const p = wasm.__wbindgen_add_to_stack_pointer(-16);
    try {
      new Uint8Array(wasm.memory.buffer).set(it, p1);
      wasm[name](p, p1, n1);
      const arr = new Int32Array(wasm.memory.buffer);
      const p2 = arr[p/4]; const n2 = arr[p/4 + 1];
      const res = new Uint8Array(wasm.memory.buffer).subarray(p2, p2 + n2).slice();
      wasm.__wbindgen_free(p2, n2);
      return res;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  };
};

const paq = async (data) => {
  const fn = await init('paq');
  return fn(data);
};

const unpaq = async (data) => {
  const fn = await init('unpaq');
  return fn(data);
};

export { paq, unpaq };
