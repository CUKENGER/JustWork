import { Button } from "@/shared/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full p-8 rounded-lg shadow-lg bg-secondary md:min-w-md max-w-lg flex items-center flex-col gap-4">
        <h1 className="text-xl font-bold">Welcome!</h1>
        <div className="flex flex-col gap-2 w-full">
          <Link href="/login">
            <Button className="w-full">SignIn</Button>
          </Link>
          <Link href="/register">
            <Button className="w-full">SignUp</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
