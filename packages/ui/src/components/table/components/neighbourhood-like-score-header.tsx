import { Table } from "@tanstack/react-table"

export const TargetScoreHeader = ({
  targetScore,
  title,
}: {
  targetScore?: number
  title?: string
}) => {
  return (
    <div className="text-left 2xl:text-base text-sm leading-tight 2xl:leading-tight font-semibold uppercase">
      {`${title}: `}
      <span className="font-bold text-brand-green-dark">
        {targetScore ?? null}
      </span>
    </div>
  )
}

function TargetBlockGroups({
  numberOfBlockGroups,
  title,
}: {
  numberOfBlockGroups?: number
  title?: string
}) {
  return (
    <div className="text-left pt-1 text-annotation leading-tight font-semibold flex flex-row w-44 items-center">
      <p>{`${title}:`}</p>
      <p className="ml-1 text-center rounded-full bg-brand-green-dark text-white pl-1 pr-1.5 text-sm flex justify-center items-center">
        {numberOfBlockGroups ?? null}
      </p>
    </div>
  )
}

export function NeighbourhoodLikeScoreHeader<TData>({
  table,
  title,
  blockgroupsTitle,
}: {
  table: Table<TData>
  title?: string
  blockgroupsTitle?: string
}) {
  const targetScore = table.options.meta?.targetScore
  const numberOfBlockGroups = table.options.meta?.length

  return (
    <>
      <TargetScoreHeader targetScore={targetScore} title={title} />
      <TargetBlockGroups numberOfBlockGroups={numberOfBlockGroups} title={blockgroupsTitle}/>
    </>
  )
}
