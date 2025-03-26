interface InfoRowProps {
    label: string;
    value: React.ReactNode;
}
  
const StudyJoinInfo = ({ label, value }: InfoRowProps) => (
    <li className="flex basis-[50%] text-sm text-black4 mb-3">
        <strong className="block w-[92px] nexon-medium">{label}</strong>
        <em className="text-black6">{value}</em>
    </li>
);

export default StudyJoinInfo;