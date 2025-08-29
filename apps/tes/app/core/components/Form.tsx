/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ReactNode, PropsWithoutRef } from "react"
import { Formik, FormikProps } from "formik"
import { styledButton2 } from "components/elements"
import { z } from "zod"
import { validateZodSchema } from "blitz"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: React.ReactNode
  onCancel?: () => void
  variant?: Parameters<typeof styledButton2>[0]["variant"]
  size?: Parameters<typeof styledButton2>[0]["size"]
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>["initialValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onCancel,
  variant = "primary",
  size = "md",
  onSubmit,
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>(null)
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {formError && (
            <div role="alert" className="text-red-700 opacity-70 text-sm pt-2">
              {formError}
            </div>
          )}

          {submitText && (
            <div
              className={`flex items-center gap-x-2 ${
                variant === "destructive-icon" ? "" : "pt-3"
              }`}
            >
              <button
                className={styledButton2({ variant, size })}
                type="submit"
                disabled={isSubmitting}
              >
                {submitText}
              </button>
              {onCancel ? (
                <button
                  onClick={onCancel}
                  className={styledButton2({ variant: "outline", size })}
                  type="button"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
