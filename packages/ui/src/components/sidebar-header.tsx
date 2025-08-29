export function SidebarHeader({
  iconPath,
  onClick,
}: {
  iconPath: string
  onClick: () => void
}) {
  const layout = "px-4 flex items-center"
  const logo = "w-44 px-2 py-4 cursor-pointer"
  return (
    <div className={layout}>
      <a onClick={onClick}>
        <img src={iconPath} className={logo} />
      </a>
    </div>
  )
}
