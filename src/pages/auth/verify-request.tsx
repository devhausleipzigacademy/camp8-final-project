import Head from "next/head";

export default function VerifyRequest() {
  return (
    <div className="w-screen h-screen rounded-lg flex flex-col items-center justify-center">
      <div className=" w-80 h-38 rounded-lg">
        <h1 className="text-center text-text-typo button-large gap-3 font-sans p-4">
          Thanks! <br />
          Please check your Inbox <br />
          <br />a link has been sent to the E-Mail address you entered
        </h1>
      </div>
    </div>
  );
}
