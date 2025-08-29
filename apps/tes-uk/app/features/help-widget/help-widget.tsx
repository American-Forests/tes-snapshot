import { HelpWidget as HelpWidgetUi } from "ui"
import { HELP_WIDGET_CONTENT } from "app/features/help-widget/help-widget.constants"

const HelpWidget = ({ className }: { className: string }) => {
  return <HelpWidgetUi content={HELP_WIDGET_CONTENT} className={className} />
}

export default HelpWidget
