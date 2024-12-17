export default function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <div className="">
      <div>{props.children}</div>
      <LayoutFooter />
    </div>
  )
}
