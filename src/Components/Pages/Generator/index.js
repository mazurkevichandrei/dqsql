import React, {useContext,useState} from 'react';

//Template components:
import Main from '../../Styled/styledMain';
import StyledSection from '../../Styled/styledSection';
import StyledSectionRows from '../../Styled/styledSectionRows';
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
            inpText: 'Put data in format: \n\nTable_1\nTable_2\n...\nTable_N',
            isActive: true, typeOfInitialData: 'Tables',
            tableFieldIsVisible: false,
            fieldValueIsVisible: false,
            conditionFieldIsVisible: true
        },
        // {
        //     id:2, name: 'GroupFields', func: 'groupFields', 
        //     inpText: 'Put data in format: \n\nTable_1 Field_1\nTable_1 Field_2\n...\nTable_1 Field_N\n...\nTable_N Field_1\nTable_N Field_2\n...\nTable_N Field_N', 
        //     isActive: false, typeOfInitialData: 'Tables Fields',
        //     tableFieldIsVisible: false
        // },
        {
            id:3, name: 'CheckFieldValue', func: 'checkFieldValue', 
            inpText: 'Put data in format:\n\nField_1\nField_2\n...\nField_N',
            isActive: false, 
            typeOfInitialData: 'Fields',
            tableFieldIsVisible: true,
            fieldValueIsVisible: true,
            conditionFieldIsVisible: false
        },
        {
            id:4, name: 'SumNumber', func: 'sumNumber', 
            inpText: 'Put data in format:\n\nField_1\nField_2\n...\nField_N',
            isActive: false,
            typeOfInitialData: 'Fields',
            tableFieldIsVisible: true,
            fieldValueIsVisible: false,
            conditionFieldIsVisible: true
        },
        {
            id:5, name: 'SumText', func: 'sumText',
            inpText: 'Put data in format:\n\nField_1\nField_2\n...\nField_N', 
            isActive: false,
            typeOfInitialData: 'Fields',
            tableFieldIsVisible: true,
            fieldValueIsVisible: false,
            conditionFieldIsVisible: true
        },
        {
            id:6, name: 'DuplicationsByPK', func: 'duplicationsByPK', 
            inpText: 'Put data in format:\n\nPK_field_1\nPK_field_2\n...\nPK_field_N',
            isActive: false, 
            typeOfInitialData: 'Fields',
            tableFieldIsVisible: true,
            fieldValueIsVisible: false,
            conditionFieldIsVisible: true
        },
    ];

    const [disableRun, setDisableRun] = useState(true)

    const [btn, setBtn] = useState(BUTTONS)
    const [selectedFunc, setSelectedFunc] = useState('count')
    const [typeOfInitialData, setTypeOfInitialData] = useState('Tables')
    const [tableFieldIsVisible, setTableFieldIsVisible] = useState(false)
    const [fieldValueIsVisible, setfieldValueIsVisible] = useState(false)
    const [conditionFieldIsVisible, setConditionFieldIsVisible] = useState(true)

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
        setTypeOfInitialData(funcName.typeOfInitialData)
        setTableFieldIsVisible(funcName.tableFieldIsVisible)
        setfieldValueIsVisible(funcName.fieldValueIsVisible)
        setConditionFieldIsVisible(funcName.conditionFieldIsVisible)
        setDisableRun(true)
        setDataResult('Result...')
    }


    const [db, setDb] = useState('')
    const [condition, setCondition] = useState('')
    const [tableNameInForm, setTableNameInForm] = useState('')
    const [fieldValue, setFieldValue] = useState('')
    const [dataInput, setDataInput] = useState('Put data in format: \n\nTable_1\nTable_2\n...\nTable_N')
    const [dataResult, setDataResult] = useState('Result...')
    const rows = 25;

    const editDb = (evt) => {
        setDb(evt.target.value)
    }

    const editCondition = (evt) => {
        setCondition(evt.target.value)
    }

    const editFieldValue = (evt) => {
        setFieldValue(evt.target.value)
    }

    const editTableNameInForm = (evt) => {
        setTableNameInForm(evt.target.value)
    }

    const editValue = (evt) => {
        setDataInput(evt.target.value)
        evt.target.value === dataInput ? setDisableRun(true) : setDisableRun(false)
    }


    //Generatot

    

    const GENERATOR = {
        count: function() {
            const preResult = dataInput.split('\n').map(item => `SELECT '${item}' as Table_Name, COUNT(*) as CNT FROM ${db}${item} ${condition}`)
            const result = preResult.join(' union\n')
            //setDataResult(result.substring(0, result.length-6))
            setDataResult(result)
        },
        groupFields: function() {
            const preResult = dataInput.split('\n').map(item => item.replace('	',' ').split(' '))
            const preResulttoObjects = preResult.map(item => Object.assign({},item))

            let resultObject = {}
            preResulttoObjects.map(item => resultObject[item[0]] ? resultObject[item[0]].push(item[1]): resultObject[item[0]]=[item[1]])

            const result = Object.keys(resultObject).reduce((s,item) => s+(`${item}:${resultObject[item]}\n`),'')
            //console.log(result)
            setDataResult(result)
        },
        checkFieldValue: function() {
            const preResult = dataInput.split('\n').map(item => `SELECT '${item}' as field, COUNT(*) as cnt FROM ${db}${tableNameInForm} WHERE ${item} ${fieldValue}`)
            const result = preResult.join(' union\n')
            //setDataResult(result.substring(0, result.length-6))
            setDataResult(result)
            //setDataResult('OK!!')
        },
        sumNumber: function() {
            const preResult = dataInput.split('\n').map(item => `SUM(NVL(${item},0)) as ${item}`)
            const resultFields = preResult.join(',\n')
            const result = `SELECT \n${resultFields}\nFROM ${db}${tableNameInForm} ${condition}`
            setDataResult(result)
        },
        sumText: function() {
            const preResult = dataInput.split('\n').map(item => `SUM(LENGTH(NVL(${item},0))) as ${item}`)
            const resultFields = preResult.join(',\n')
            const result = `SELECT \n${resultFields}\nFROM ${db}${tableNameInForm} ${condition}`
            setDataResult(result)
        },
        duplicationsByPK: function() {
            // const preResult = dataInput.split('\n')
            // const table = preResult.shift()
            // const result = `SELECT\n'${table}' AS table_name,\nCOUNT(*) as cnt_all,\nCOUNT(distinct ${preResult}) as count_unic_PK,\n(COUNT(*)-COUNT(distinct ${preResult}))AS diff \nFROM ${db}${table}`
            const preResult = dataInput.split('\n')
            const result = `SELECT\n'${tableNameInForm}' AS table_name,\nCOUNT(*) as cnt_all,\nCOUNT(distinct ${preResult}) as count_unic_PK,\n(COUNT(*)-COUNT(distinct ${preResult}))AS diff \nFROM ${db}${tableNameInForm} ${condition}`
            setDataResult(result)
        }
    }

    const runGenerator = (func) => {
        const funcToRun = GENERATOR[func]
        funcToRun()
    }

    return(
       <Main>
           <StyledSection>
           <StyledSubTitle>Select function:</StyledSubTitle>
           <ButtonsArea>
                {btn.map(item => {return(
                    <ButtonMain key={item.id} isActive={item.isActive} onClick={() => mainButtonAction(item.id)}>{item.name}</ButtonMain>
                )})}
           </ButtonsArea>
           </StyledSection>


           <StyledSection>
            <StyledSectionRows>
                <StyledSubTitle>DB:</StyledSubTitle>
                <DbArea rows='1' onChange={editDb}>databasename.</DbArea>

                <StyledSubTitle visible={fieldValueIsVisible}>Field value:</StyledSubTitle>
                <DbArea rows='1' onChange={editFieldValue} visible={fieldValueIsVisible}>is Null,=0,>0...</DbArea>

                <StyledSubTitle visible={conditionFieldIsVisible}>Condition:</StyledSubTitle>
                <DbArea rows='1' onChange={editCondition} visible={conditionFieldIsVisible}>{`where field =,!=,<> condition`}</DbArea>
                
                    <StyledSubTitle visible={tableFieldIsVisible}>Table:</StyledSubTitle>
                    <DbArea rows='1' onChange={editTableNameInForm} visible={tableFieldIsVisible}>Table_name</DbArea>
            </StyledSectionRows>
            </StyledSection>


            <StyledSection>
            <StyledSubTitle>{typeOfInitialData}:</StyledSubTitle>
            <StyledSectionRows>
               <InputArea rows={rows} value={dataInput} onChange={editValue}></InputArea>
               <StartBtn onClick={()=>runGenerator(selectedFunc)} disabled={disableRun}>Generate SQL - ></StartBtn>
               <InputArea rows={rows} value={dataResult}></InputArea>
           </StyledSectionRows>
           </StyledSection>
           
       </Main>
       
    )
}

export default Generator;