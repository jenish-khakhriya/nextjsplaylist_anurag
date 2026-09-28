const Search = () => {
    return <div className="w-full px-3 bg-amber-500 flex relative">
        <div className="w-full grid grid-cols-7 gap-3">
            <input type="text" className="w-full col-span-4 rounded-lg py-2 px-3 tracking-widest outline-none border border-white text-white font-semibold" />
        </div>
        <div className="absolute w-full grid grid-cols-7 gap-3">
            <div className="col-span-4 h-[400px] top-6 border border-black">

            </div>
        </div>
    </div>
}

export default Search;