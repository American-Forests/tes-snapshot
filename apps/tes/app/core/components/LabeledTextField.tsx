import { forwardRef, PropsWithoutRef } from "react"
import { Label, Input } from "components/elements"
import { useField, useFormikContext, ErrorMessage } from "formik"
import clsx from "clsx"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  variant?: "default" | "noborder"
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, variant = "default", label, outerProps, ...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <div>
          <Label variant={variant}>{label}</Label>
          <Input variant={variant} {...input} disabled={isSubmitting} {...props} ref={ref} />
        </div>

        <ErrorMessage name={name}>
          {(msg) => (
            <div
              role="alert"
              className={clsx("text-red-500 text-sm pt-2", variant === "noborder" && "p-2")}
            >
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    )
  },
)

export default LabeledTextField
