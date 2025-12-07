import React from "react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import Link from "next/link";

const AuthButton = () => {
  return <Button>Login</Button>;
};

const MobileAuthButton = () => {
  return (
    <ButtonGroup className="w-full flex-col gap-2 hover:bg-transparent">
      <Link href="/login">
        <Button variant="default" className="w-full">Masuk</Button>
      </Link>
      <Link href="/signup">
        <Button variant="outline" className="w-full">Daftar</Button>
      </Link>
    </ButtonGroup>
  );
};

export { AuthButton, MobileAuthButton };
