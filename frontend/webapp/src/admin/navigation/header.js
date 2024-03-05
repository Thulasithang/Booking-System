import { useNavigate } from "react-router-dom";
import { ActionButton, ActionContainer, TitleHeader } from "../../styles/admin/global";


export default function Header({title, actionName, navigation}) {
    const navigate = useNavigate();
    return (
        <>
        <TitleHeader variant="h1">{title}</TitleHeader>
        <ActionContainer className="test">
            <ActionButton variant="contained" onClick={()=> navigate(`/manage/${navigation}`)}>{actionName}</ActionButton>
        </ActionContainer>
        </>
    )
}