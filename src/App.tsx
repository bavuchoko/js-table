import React from 'react';
import './App.css';
import JsTable from "./app/JsTable";

function App() {
    
    const header =[
        {key:'checker', label: '', style: {fontSize: 12}},
        {key:'no', label: 'no.', style: {fontSize: 12}},
        {key:'name', label: '이름', style: {fontSize: 12, width:'200px'}},
        {key:'title', label: '제목', style: {fontSize: 12}},
        {key:'createdBy.name', label: '등록자', style: {fontSize: 12}},
    ]

    const data: any =[
        {id: 1,name:'김길동', title:'test', createdBy:{id:1, name:'강호동'} },
        {id:2, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:3, name:'김정모', title:'test', createdBy:{id:2, name:'김희라'}},
        {id:4, name:'추정모', title:'test', createdBy:{id:2, name:'유희라'}},
        {id:5, name:'정정모', title:'test', createdBy:{id:2, name:'노희라'}},
        {id:6, name:'문정모', title:'test', createdBy:{id:2, name:'자희라'}},
        {id:7, name:'노정모', title:'test', createdBy:{id:2, name:'최영제'}},
        {id:8, name:'한정모', title:'test', createdBy:{id:2, name:'김영제'}},
        {id:9, name:'장정모', title:'test', createdBy:{id:2, name:'홍영제'}},
        {id:10, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:11, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:12, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:13, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:14, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:15, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:16, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:17, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:18, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
        {id:19, name:'홍정모', title:'test', createdBy:{id:2, name:'하희라'}},
    ]

    return (
        <div className="App">
            <div className={`w-full h-[200px] bg-amber-100`}>test</div>
            <div className={`flex`}>
                <div className={`w-[300px] bg-pink-50`}>aa</div>

                <div className="w-[1200px] h-[500px] ">
                    <JsTable
                        header={header}
                        data={data}
                        page={{
                            size:20,
                            currentPage:0,
                            totalPages:50,
                            totalElements:1000,
                            sort:['name'],
                            desc:'asc'
                        }}
                        usePagination
                        onHeaderMove={v =>{console.log('order:', v)}}
                        resizable={true}
                        draggable={true}
                        onRowClick={v=>console.log('id:', v)}
                        onResizeWidth={v=>console.log('width:', v)}
                        onPageChange={v=>console.log('page:', v)}
                    />
                </div>

            </div>
        </div>
    );
}

export default App;
