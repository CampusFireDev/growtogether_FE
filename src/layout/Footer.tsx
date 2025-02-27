
const Footer = ():JSX.Element =>{
    return(
        <footer className="w-full pt-[40px] pb-[40px] bg-[#262A30]">
            <div className="w-[1200px] mx-auto flex justify-between">
                <div>
                    <p className="text-lg nexon-bold text-white">GrowTogether</p>
                    <p className="mt-1 text-sm text-zinc-400"> COPYRIGHT ⓒ GrowTogether. ALL RIGHTS RESERVED</p>
                </div>
                <ul className="list-none flex gap-4 text-sm nexon text-white">
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>서비스소개</li>
                </ul>

            </div>
        </footer>
    )
}

export default Footer;