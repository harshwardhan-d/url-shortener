import { ChakraProvider } from "@chakra-ui/react"
import UrlShortenerUI from "./UrlShortenerUI"

function App() {
  return (
    <ChakraProvider>
      <UrlShortenerUI />
    </ChakraProvider>
  )
}

export default App