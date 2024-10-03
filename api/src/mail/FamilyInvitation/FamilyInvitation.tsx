import React from 'react'

import {
  Html,
  Text,
  Hr,
  Body,
  Head,
  Tailwind,
  Preview,
  Container,
  Heading,
} from '@react-email/components'

interface FamilyInvitationProps {
  name: string;
  url: string;
}

export function FamilyInvitation(
  props: FamilyInvitationProps
) {
  return (
    <Html lang="en">
      <Head />
      <Preview>An example email</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] rounded border border-solid border-gray-200 p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Hello {props.name}
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              This is an example email which you can customise to your needs.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              {props.url}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
