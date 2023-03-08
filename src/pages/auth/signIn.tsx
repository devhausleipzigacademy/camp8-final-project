import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSignInGoogle = () => signIn("google");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const emailCheck = new RegExp(`[A-z]*@[a-z]+.com`);

  return (
    <div className="h-screen flex flex-col justify-around items-centers">
      <div></div>
      <div className="w-96 aspect-square bg-secondary-default"></div>
      <div className="flex flex-col justify-around">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="bg-secondary-default p-2 rounded-md border-2"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailCheck.test(email) && (
            <button className="text-text-white p-2 rounded-md bg-primary-default-Solid">
              Send Link to email
            </button>
          )}
        </form>
        <button
          className="bg-primary-default-Solid p-3 rounded-md"
          onClick={handleSignInGoogle}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
