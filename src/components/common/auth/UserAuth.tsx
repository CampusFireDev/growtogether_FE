import FormButton from "../../form/FormButton";

interface UserAuthProps {
    btnTitle?: string;
    showBtn?: boolean; //  FormButton으로 표시 여부
}

const UserAuth = ({ btnTitle="", showBtn=true }: UserAuthProps): JSX.Element => {
    return (
        <div>
            {showBtn && btnTitle && ( 
                <FormButton type="button">{btnTitle}</FormButton>
            )}
        </div>
    )
}

export default UserAuth;