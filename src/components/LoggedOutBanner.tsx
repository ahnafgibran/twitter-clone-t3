import { signIn, useSession } from "next-auth/react";
import React from "react";
import Container from "./Container";

const LoggedOutBanner = () => {
  const { data: session } = useSession();

  if (session) {
    return null;
  }
  return (
    <div className="fixed bottom-0 w-full bg-primary p-4">
      <Container classNames='bg-transparent flex justify-between'>
        <p className="text-white">Do not miss out</p>
        <div>
          <button
            className="shadow-md px-4 py-2 text-white"
            onClick={() => signIn()}
          >
            Login
          </button>
        </div>
      </Container>
    </div>
  );
};

export default LoggedOutBanner;
