/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, PropsWithoutRef } from "react"
import { Formik, FormikProps } from "formik"
import { z } from "zod"
import { CheckIcon } from "@radix-ui/react-icons"
import { validateZodSchema } from "blitz"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  onCancel?: () => void
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
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { ...otherErrors } = (await onSubmit(values)) || {}
        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} {...props} className="flex items-center">
          {/* Form fields supplied as children are rendered here */}
          {children}

          <button
            className="h-8 flex items-center px-2 bg-brand-green text-white rounded-md rounded-l-none"
            type="submit"
            disabled={isSubmitting}
          >
            <CheckIcon />
          </button>
        </form>
      )}
    </Formik>
  )
}

export default Form
