import {
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface verificationEmailProps {
  username: string;
  otp: string;
}

export default function Email({ username, otp }: verificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Verification Email</title>
      </Head>
      <Section>
        <Row>
          <Heading as="h2" >Dear {username}</Heading>
        </Row>
        <Preview>Your One Time Password OTP for login: {otp}</Preview>
        <Row>
          <Text>
            OTP is valid only for 05:00 mins. Do not share this OTP with anyone.
          </Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
