import { Input, Button } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const DiaryInput = ({isLoading, onSubmit}) => {
    const [userInput, setUserInput] = useState("");
    // 사용자의 입력을 받아, 상위컴포넌트로 데이터를 전달
    // loading 상태 - 사용자가 제출버튼을 못 누르도록 처리

    
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleClick = () => {
        onSubmit(userInput);
    }

    return (
        <>
            <TextArea 
                value={userInput} 
                onChange={handleUserInput} 
                placeholder="오늘 일어난 일들을 간단히 적어주세요" 
            />
            <Button loading={isLoading} onClick={handleClick}>GPT 회고록을 작성해줘</Button>
        </>
    )
}

export default DiaryInput