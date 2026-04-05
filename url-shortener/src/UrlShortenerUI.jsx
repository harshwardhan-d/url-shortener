import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";

export default function UrlShortenerUI() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setShortUrl("");

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: longUrl }),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError("Something went wrong, try again");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack w="full" maxW="480px" spacing={5}>
        <VStack spacing={1} textAlign="center">
          <Heading fontSize="2xl" fontWeight="700" letterSpacing="-0.5px">
            URL Shortener
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Paste a long URL and get a short one instantly
          </Text>
        </VStack>

        <Box
          w="full"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="2xl"
          p={5}
        >
          <VStack spacing={3} align="stretch">
            <Text
              fontSize="xs"
              fontWeight="600"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              Long URL
            </Text>
            <Input
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://very-long-website.com/some/deep/path"
              size="md"
              borderRadius="lg"
              borderColor="gray.200"
              fontSize="sm"
              color="gray.800"
            />
            <Button
              bg="gray.900"
              color="white"
              _hover={{ bg: "gray.700" }}
              borderRadius="lg"
              fontWeight="600"
              onClick={handleSubmit}
            >
              Shorten URL
            </Button>
          </VStack>
        </Box>

        {error && (
          <Box
            w="full"
            bg="red.50"
            border="1px solid"
            borderColor="red.200"
            borderRadius="xl"
            px={4}
            py={3}
          >
            <Text fontSize="sm" color="red.600">
              {error}
            </Text>
          </Box>
        )}

        {shortUrl && (
          <Box
            w="full"
            bg="white"
            border="1px solid"
            borderColor="green.200"
            borderRadius="2xl"
            p={5}
          >
            <VStack spacing={3} align="stretch">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  fontSize="xs"
                  fontWeight="600"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  Your short URL
                </Text>
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                >
                  Ready
                </Badge>
              </Box>
              <Box display="flex" gap={2}>
                <Input
                  value={shortUrl}
                  isReadOnly
                  fontFamily="mono"
                  fontSize="sm"
                  bg="gray.50"
                  borderColor="gray.200"
                  borderRadius="lg"
                  color="gray.800"
                />
                <Button
                  size="sm"
                  fontSize="xs"
                  bg="gray.900"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                  borderRadius="md"
                  flexShrink={0}
                  px={4}
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </Box>
              <Divider />
              <Text fontSize="xs" color="gray.400" noOfLines={1}>
                Original: {longUrl}
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
