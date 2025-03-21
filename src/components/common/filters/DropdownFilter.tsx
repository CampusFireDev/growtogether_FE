interface DropdownFilterProps {
    label: string;
}

const DropdownFilter = ({ label }: DropdownFilterProps): JSX.Element => {
    return (
        <>
            <button
                className="flex items-center gap-3 h-[40px] px-[12px] text-[11px] sm:text-[15px] text-black4 border border-gray5 rounded-[5px]"
            >
                { label }
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M1 1.5L5.00065 5.5L9 1.5" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </>
    )
}
export default DropdownFilter;