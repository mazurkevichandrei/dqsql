import React, {useContext,useState} from 'react';

//Template components:
import Main from '../../Styled/styledMain';
import StyledSubTitle from '../../Styled/styledSubTitle';
import ButtonsArea from './Components/Styled/ButtonsArea';
import ButtonMain from './Components/Styled/ButtonMain';
import InputArea from './Components/Styled/InputArea';
import StartBtn from './Components/Styled/StartBtn';

const Generator = () => {

    const BUTTONS  = [
        {id:1, name: 'Count', func: 'count', isActive: true, inpText: 'Please, put data in format: \n\nTable_1 \nTable_2 \nTable_3 \n...'},
        {id:2, name: 'GroupFields', func: 'groupFields', inpText: 'Please, put data in format: \n\nTable_1 Field_1\nTable_1 Field_2 \nTable_1 Field_N \nTable_N Field_1 \nTable_N Field_N \n...', isActive: false},
        {id:3, name: 'CheckCondition', func: 'checkCondition', isActive: false},
        {id:4, name: 'SumNumber', func: 'sumNumber', isActive: false},
        {id:5, name: 'SumText', func: 'sumText', isActive: false},
    ];

    const [disableRun, setDisableRun] = useState(true)

    const [btn, setBtn] = useState(BUTTONS)
    const [selectedFunc, setSelectedFunc] = useState('Count')

    const mainButtonAction = (id) =>{
        const updBtns = BUTTONS.map(
            item => (
            {...item ,isActive: false}
                )
            )
        const updBtn = updBtns.map(item => item.id === id ? {...item ,isActive: true} : item)
        setBtn(updBtn)

        const [funcName] = BUTTONS.filter(item => item.id === id)
        setSelectedFunc(funcName.name)
        setDataInput(funcName.inpText)
        setDisableRun(true)
        setDataResult('Result...')
    }


    const [dataInput, setDataInput] = useState('Please, put data in format: \n\nTable_1, \nTable_2, \nTable_3, \n...')
    const [dataResult, setDataResult] = useState('Result...')
    const rows = 25;

    const editValue = (evt) => {
        setDataInput(evt.target.value)
        evt.target.value === dataInput ? setDisableRun(true) : setDisableRun(false)
    }


    //Generatot

    const runGenerator = () => {
        console.log(selectedFunc)
        const preResult = dataInput.split('\n').map(item => `select '${item}' as Table_Name, count(*) as Count from ${item} union`)
        setDataResult(preResult.join('\n'))
    }

    return(
       <Main>
           <StyledSubTitle>Select function:</StyledSubTitle>
           <ButtonsArea>
                {btn.map(item => {return(
                    <ButtonMain key={item.id} isActive={item.isActive} onClick={() => mainButtonAction(item.id)}>{item.name}</ButtonMain>
                )})}
           </ButtonsArea>
           <ButtonsArea>
               
           </ButtonsArea>
           <ButtonsArea>
               
           </ButtonsArea>
           <ButtonsArea>
               <InputArea rows={rows} value={dataInput} onChange={editValue}></InputArea>
               <StartBtn onClick={()=>runGenerator()} disabled={disableRun}>Generate SQL - ></StartBtn>
               <InputArea rows={rows} value={dataResult}></InputArea>
           </ButtonsArea>
           
       </Main>
       
    )
}

export default Generator;