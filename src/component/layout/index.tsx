import { ThemedLayout, ThemedTitle } from "@refinedev/antd"
  import Header from "./header"
import type { PropsWithChildren } from "react"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ThemedLayout
    Header={Header}
    Title={(titleProps) => (
      <ThemedTitle {...titleProps} text="Refine" />
    )}
    >
      {children}
    </ThemedLayout>
   
  )
}

export default Layout
