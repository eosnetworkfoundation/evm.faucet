import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const Twitter = () => (
  <Box padding={2} minWidth={30}>
    <Link
      href="https://twitter.com/EOSnFoundation"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image alt="Twitter" src="/twitter.svg" width={30} height={30} />
    </Link>
  </Box>
)