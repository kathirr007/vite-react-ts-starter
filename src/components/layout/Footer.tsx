import useDarkMode from '@/hooks/useDarkMode'

function Footer() {
  const { toggleDark } = useDarkMode()

  return (
    <footer className="flex justify-center w-full pb-4 text-white footer">
      <nav className="flex mt-6 text-xl" dir="ltr">
        <CoreButton onClick={toggleDark} color="secondary" variant="text" size="lg" iconOnly className="!text-lg">
          <span className="i-solar-moon-bold-duotone dark:i-solar-sun-bold-duotone " />
          <span className="sr-only">dark mode</span>
        </CoreButton>
      </nav>
    </footer>
  )
}

export { Footer }
