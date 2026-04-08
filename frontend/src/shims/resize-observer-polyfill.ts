type ResizeObserverCallback = ConstructorParameters<typeof ResizeObserver>[0]

class NoopResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const ResizeObserverPolyfill: typeof ResizeObserver =
  typeof globalThis !== 'undefined' && 'ResizeObserver' in globalThis
    ? globalThis.ResizeObserver
    : (class FallbackResizeObserver extends NoopResizeObserver {
        constructor(_callback: ResizeObserverCallback) {
          super()
        }
      } as typeof ResizeObserver)

export default ResizeObserverPolyfill
