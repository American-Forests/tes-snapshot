import { Facet, facetGroups } from "data/facets"
import { facetsAtom } from "app/state"
import { useAtomValue } from "jotai"

const ListFacetSelector = ({
  activeFacet,
  setActiveFacet,
}: {
  activeFacet: Facet
  setActiveFacet: React.Dispatch<React.SetStateAction<Facet>>
}) => {
  const facets = useAtomValue(facetsAtom)
  return (
    <div className="space-y-4">
      {Object.values(facetGroups).map((facetGroup) => (
        <div key={facetGroup.title}>
          <div className="px-6 text-xs font-bold pb-1">{facetGroup.title}</div>
          <div className="flex flex-col space-y-1 px-3">
            {facets
              .filter((facet) => facet.group == facetGroup)
              .map((facet) => (
                <button
                  className={`text-left flex flex-row text-sm py-1 px-3 rounded-full cursor-pointer hover:bg-brand-green hover:text-white ${
                    activeFacet == facet ? `bg-brand-green-dark text-white` : ""
                  }`}
                  key={facet.field.field}
                  onClick={() => setActiveFacet(facet)}
                >
                  {facet.title}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListFacetSelector
