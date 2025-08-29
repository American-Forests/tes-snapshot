export const TargetScoreBar = ({
  score,
  deltaScore,
}: {
  score: number
  deltaScore: number
}) => (
  <div className="flex items-center">
    <p className="min-w-[2.5rem] text-right">{score}</p>
    <div className="ml-4 flex h-3 w-36 items-center justify-start rounded-md bg-brand-green-dark/20">
      <div
        className={`h-3 rounded-l-md bg-brand-green-dark ${
          deltaScore === 0 && "rounded-r-md"
        }`}
        style={{
          width: `${score - (deltaScore === 0 ? 0 : 4)}%`, // -4% to account for the arrow head
        }}
      />
      <div
        className="h-3 bg-brand-green-dark/40"
        style={{ width: `${deltaScore}%` }}
      />
      {deltaScore > 0 ? (
        <div className="h-0 w-0 border-b-[0.6rem] border-l-[0.4rem] border-t-[0.6rem] border-b-transparent border-l-brand-green-dark/40 border-t-transparent" />
      ) : null}
    </div>
  </div>
)
