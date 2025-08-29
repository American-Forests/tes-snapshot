import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

export default function DownloadOptionsDropdown({
  label,
  s3key,
  locale,
}: {
  label: string
  s3key: string
  locale?: string
}) {
  return (
    <DropdownMenu.Root key={s3key}>
      <DropdownMenu.Trigger asChild>
        {locale === "en-CA" ? (
          <button className="sm:text-xl text-base text-white bg-brand-green hover:bg-brand-green-dark transition-all duration-500 rounded-full py-2 px-6 ml-6">
            Download Data
          </button>
        ) : (
          <button className="text-gray-700 no-underline hover:text-brand-green text-left capitalize">
            {label}
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-lg shadow-lg min-w-[150px]">
          <p className="captialize text-gray-700 font-bold pt-2 px-2 ">{label}</p>
          <div className="border-gray-700 border-t" />
          <DropdownMenu.Item className="DropdownMenuItem">
            <a
              className="text-gray-700 no-underline p-2 hover:text-brand-green"
              download
              href={`https://tes-app-data-share.s3.amazonaws.com/${s3key}/${s3key}_shp.zip`}
            >
              Shapefile
            </a>
          </DropdownMenu.Item>
          <div className="border-gray-500 border-t" />
          <DropdownMenu.Item className="DropdownMenuItem">
            <a
              className="text-gray-700 no-underline p-2 hover:text-brand-green"
              download
              href={`https://tes-app-data-share.s3.amazonaws.com/${s3key}/${s3key}_geojson.zip`}
            >
              GeoJSON
            </a>
          </DropdownMenu.Item>
          <div className="border-gray-500 border-t" />
          <DropdownMenu.Item className="DropdownMenuItem">
            <a
              className="text-gray-700 no-underline p-2 hover:text-brand-green"
              download
              href={`https://tes-app-data-share.s3.amazonaws.com/${s3key}/${s3key}_csv.zip`}
            >
              CSV
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
