import React, {useContext,useState} from 'react';

//Template components:
import Main from '../../Styled/styledMain';
import StyledSubTitle from '../../Styled/styledSubTitle';
import ButtonsArea from './Components/Styled/ButtonsArea';
import ButtonMain from './Components/Styled/ButtonMain';
import DbArea from './Components/Styled/DbArea';
import InputArea from './Components/Styled/InputArea';
import StartBtn from './Components/Styled/StartBtn';

const Generator = () => {

    const BUTTONS  = [
        {
            id:1, name: 'Count', func: 'count', 
            inpText: 'Put data in format: \n\nTable_1\nTable_2\nTable_3\n...',
            isActive: true
        },
        {
            id:2, name: 'GroupFields', func: 'groupFields', 
            inpText: 'Put data in format: \n\nTable_1 Field_1\nTable_1 Field_2\nTable_1 Field_N\nTable_N Field_1\nTable_N Field_N\n...', 
            isActive: false
        },
        {
            id:3, name: 'CheckCondition', func: 'checkCondition', isActive: false
        },
        {
            id:4, name: 'SumNumber', func: 'sumNumber', isActive: false
        },
        {
            id:5, name: 'SumText', func: 'sumText', isActive: false
        },
    ];

    const [disableRun, setDisableRun] = useState(true)

    const [btn, setBtn] = useState(BUTTONS)
    const [selectedFunc, setSelectedFunc] = useState('count')

    const mainButtonAction = (id) =>{
        const updBtns = BUTTONS.map(
            item => (
            {...item ,isActive: false}
                )
            )
        const updBtn = updBtns.map(item => item.id === id ? {...item ,isActive: true} : item)
        setBtn(updBtn)

        const [funcName] = BUTTONS.filter(item => item.id === id)
        setSelectedFunc(funcName.func)
        setDataInput(funcName.inpText)
        setDisableRun(true)
        setDataResult('Result...')
    }


    const [db, setDb] = useState('')
    const [condition, setCondition] = useState('')
    const [dataInput, setDataInput] = useState('Put data in format: \n\nTable_1\nTable_2\nTable_3\n...')
    const [dataResult, setDataResult] = useState('Result...')
    const rows = 25;

    const editDb = (evt) => {
        setDb(evt.target.value)
    }

    const editCondition = (evt) => {
        setCondition(evt.target.value)
    }

    const editValue = (evt) => {
        setDataInput(evt.target.value)
        evt.target.value === dataInput ? setDisableRun(true) : setDisableRun(false)
    }


    //Generatot

    const GENERATOR = {
        count: function() {
            const preResult = dataInput.split('\n').map(item => `select '${item}' as Table_Name, count(*) as CNT from ${db}${item} ${condition} union`)
            setDataResult(preResult.join('\n'))
        },
        groupFields: function() {
            const preResult = dataInput.split('\n').map(item => item.replace('	',' ').split(' '))
            const preResulttoObjects = preResult.map(item => Object.assign({},item))

            let resultObject = {}
            preResulttoObjects.map(item => resultObject[item[0]] ? resultObject[item[0]].push(item[1]): resultObject[item[0]]=[item[1]])

            const result = Object.keys(resultObject).reduce((s,item) => s+(`${item}:${resultObject[item]}\n`),'')
            console.log(result)
            setDataResult(result)
        }
    }

    const runGenerator = (func) => {
        const funcToRun = GENERATOR[func]
        funcToRun()
    }

    return(
       <Main>
           <StyledSubTitle>Select function:</StyledSubTitle>
           <ButtonsArea>
                {btn.map(item => {return(
                    <ButtonMain key={item.id} isActive={item.isActive} onClick={() => mainButtonAction(item.id)}>{item.name}</ButtonMain>
                )})}
           </ButtonsArea>
           <StyledSubTitle>DB:</StyledSubTitle>
           <DbArea rows='1' onChange={editDb}>databasename.</DbArea>
           <StyledSubTitle>Condition:</StyledSubTitle>
           <DbArea rows='1' onChange={editCondition}>condition</DbArea>
           <ButtonsArea>
               
           </ButtonsArea>
           <StyledSubTitle>Initial data:</StyledSubTitle>
           <ButtonsArea>
               <InputArea rows={rows} value={dataInput} onChange={editValue}></InputArea>
               {/* <StartBtn onClick={()=>runGenerator()} disabled={disableRun}>Generate SQL - ></StartBtn> */}

               <StartBtn onClick={()=>runGenerator(selectedFunc)} disabled={disableRun}>Generate SQL - ></StartBtn>

               <InputArea rows={rows} value={dataResult}></InputArea>
           </ButtonsArea>
           
       </Main>
       
    )
}

export default Generator;