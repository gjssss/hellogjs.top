function toggle() {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDark(event: MouseEvent) {
  const colorMode = useColorMode()
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    toggle()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    toggle()
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: colorMode.preference === 'dark'
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: colorMode.preference === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

let timer: NodeJS.Timeout | null = null
const MOVEIN_DELAY = 300

export const slideToggleDark = ref({
  onMouseenter: () => {
    timer = setTimeout(() => {
      timer = null
      const el = document.getElementById('__transition')!
      el.style.opacity = '1'
      el.classList.add('hover')
    }, MOVEIN_DELAY)
  },
  onMouseleave: () => {
    if (timer)
      clearTimeout(timer)

    const el = document.getElementById('__transition')!
    el.classList.remove('hover')
  },
  onClick: () => {
    const el = document.getElementById('__transition')!
    el.style.opacity = '1'
    el.classList.add('active')
    setTimeout(() => {
      toggle()
      el.style.opacity = '0'
      el.classList.remove('active')
      el.classList.remove('hover')
    }, MOVEIN_DELAY)
  },
})
