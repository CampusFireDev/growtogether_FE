
const Footer = ():JSX.Element =>{
    return(
        <div className="fixed bottom-0 w-full flex justify-between items-center nexon-medium  px-1 py-8 bg-zinc-100">
            <div className="">
                <p className="text-base nexon-bold"> GrowTogehter </p>
                <p className="text-xs text-zinc-400"> COPYRIGHT ⓒ GrowTogether. ALL RIGHTS RESERVED</p>

            </div>

            <ul className="list-none flex gap-4 text-xs nexon-bold">
                <li>이용약관</li>
                <li>개인정보처리방침</li>
                <li>서비스소개</li>
            </ul>

        </div>

    )
}

export default Footer;