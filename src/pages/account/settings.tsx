export default function Settings() {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex items-center pl-8 pt-8">
        <div className="bg-slate-400 h-8 w-8">Back</div>
      </div>
      <div className=" px-8 py-5 w-full flex-grow flex flex-col gap-5">
        <div className="flex bg-slate-400 w-full h-10">Account vs settings</div>
        <div className="w-full h-1 bg-slate-400"></div>
        <div className="flex w-full flex-col items-center gap-5 justify-start">
          <div className="flex bg-slate-400 w-full h-10">Option 1</div>
          <div className="flex bg-slate-400 w-full h-10">Option 2</div>
          <div className="flex bg-slate-400 w-full h-10">Option 3</div>
        </div>
      </div>
    </div>
  );
}
