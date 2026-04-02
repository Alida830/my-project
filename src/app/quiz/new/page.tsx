import UploadDoc from "../UploadDoc";

const page = () => {
    return (
        <div className="flex flex-col flex-1 min-h-[calc(100vh-80px)] items-center justify-center py-16 px-4 bg-background">
            <main className="w-full max-w-4xl bg-zinc-950/60 border border-neutral-800/80 rounded-3xl p-8 sm:p-14 shadow-2xl backdrop-blur-md flex flex-col text-center gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                    Generate a New Quiz
                  </h2>
                  <p className="text-neutral-400 text-lg max-w-xl mx-auto">
                    Provide a document or topic, and our AI will quickly create an interactive quiz to test your knowledge.
                  </p>
                </div>
                
                <div className="w-full max-w-2xl bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
                  <UploadDoc />
                </div>
            </main>
        </div>
    )
}

export default page;