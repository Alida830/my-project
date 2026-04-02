import Header from "../../components/header";

export default function Layout({children}:{
    children: React.ReactNode
}) {
    return (
        <><Header/>
        <div className="flex flex-col flex-1 max-w-7xl w-full mx-auto min-h-screen gap-6 px-4">
            {children}
        </div>
    </>
    )
}