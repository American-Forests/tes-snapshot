import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
import { Formik, Form, Field, ErrorMessage } from "formik"
import { z } from "zod"
import { Suspense, useState } from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { validateZodSchema } from "blitz"

const Contact: BlitzPage = () => {
  const schema = z.object({
    name: z.string().max(30).optional(),
    email: z.string().email("Invalid email"),
    organization: z.string().optional(),
    comment: z.string(),
    questionType: z.string(),
  })

  const QUESTION_TYPES = [
    "Technical / Data",
    "Report a bug or issue",
    "City partnerships / goals",
    "Frontline community org partnerships / goals",
    "Technical tools / implementation",
    "Media inquiries and social media toolkit",
    "Donations",
    "General feedback",
  ]

  // Define initial form values
  const initialValues = {
    name: "",
    email: "",
    organization: "",
    comment: "",
    questionType: QUESTION_TYPES[0], // New field for question type
  }

  const ContactForm = () => {
    const [sent, setSent] = useState<"init" | "sending" | "sent">("init")

    const handleSubmit = async (values: {
      name: string
      email: string
      organization: string
      comment: string
      questionType: string
    }) => {
      setSent("sending")
      const data = { destination: "treeequityscore@americanforests.org", ...values }
      await fetch("https://q2n0on3lr0.execute-api.us-east-1.amazonaws.com/contactFormEmailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
      setSent("sent")
    }

    return (
      <div className="text-gray-800">
        <h1 className="lg:text-[40px] text-3xl font-semibold mb-2 pl-8 py-6">Get in touch</h1>
        {sent === "sent" && <div>Thanks for reaching out! Your message has been sent.</div>}
        {sent === "sending" && <div>Your message is sending...</div>}
        {sent === "init" && (
          <div className="px-8">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={async (val) => {
                return await validateZodSchema(schema)(val)
              }}
              validateOnChange={false}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="questionType" className="block font-semibold mb-1">
                    What type of question or comment do you have?
                  </label>
                  <Field
                    as="select"
                    id="questionType"
                    name="questionType"
                    className="w-full px-4 py-2 border border-gray-500 rounded focus:ring-gray-500 focus:border-gray-500"
                  >
                    {QUESTION_TYPES.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="questionType" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="name" className="block font-semibold mb-1">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-500 rounded focus:ring-gray-500 focus:border-gray-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block font-semibold mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-500 rounded focus:ring-gray-500 focus:border-gray-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="organization" className="block font-semibold mb-1">
                    Organization
                  </label>
                  <Field
                    type="text"
                    id="organization"
                    name="organization"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-500 rounded focus:ring-gray-500 focus:border-gray-500"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block font-semibold mb-1">
                    Comments
                  </label>
                  <Field
                    as="textarea"
                    id="comment"
                    name="comment"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-500 rounded focus:ring-gray-500 focus:border-gray-500"
                  />
                  <ErrorMessage name="comment" component="div" className="text-red-500" />
                </div>
                <div className="flex flex-row justify-center items-center">
                  <button
                    type="submit"
                    className="bg-brand-green-dark text-white uppercase font-semibold tracking-wider px-6 py-2 rounded-full hover:bg-brand-green-darker"
                  >
                    Send
                  </button>
                </div>
                <div className="h-6"></div>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#ECF5F2]">
      <div
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Banner_DarkerGr_gdt.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges",
        }}
      >
        <div className="bg-white">
          <Header />
        </div>
        <div className="h-80"></div>
      </div>

      <div className="xl:w-1/2 md:w-4/5 w-11/12 m-auto -mt-56">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      <div className="h-20"></div>
      <Footer />
    </div>
  )
}

Contact.getLayout = (page) => <Layout title={"Contact Us"}>{page}</Layout>
export default Contact
